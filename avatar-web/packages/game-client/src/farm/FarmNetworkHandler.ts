/**
 * FarmNetworkHandler.ts
 * Manages two-way network synchronization between Web Client and Java Server FarmMsgHandler (Cmd.java).
 */

import { NetworkSession } from '../network/NetworkSession.js';
import { FarmModel, LandItemState } from './FarmModel.js';

export class FarmNetworkHandler {
  public model: FarmModel;
  public network: NetworkSession;

  public onFarmDataUpdated?: (model: FarmModel) => void;
  public onInventoryUpdated?: (model: FarmModel) => void;
  public onPlantSeedSuccess?: (cellIndex: number, seedId: number) => void;
  public onHarvestSuccess?: (cellIndex: number, yieldCount: number) => void;
  public onOpenLandSuccess?: (slot: number, newXu: number, newLuong: number) => void;
  public onNotification?: (message: string) => void;

  constructor(network: NetworkSession, model?: FarmModel) {
    this.network = network;
    this.model = model || new FarmModel();
    this.bindEvents();
  }

  private bindEvents(): void {
    // 1. FARM_JOIN (Cmd.JOIN = 61)
    this.network.on('farm_join', (data: any) => {
      console.log(`[FarmNetwork] Received farm_join for User ${data.userId}:`, data);
      this.model.updateFromJoinPayload(data);
      if (this.onFarmDataUpdated) {
        this.onFarmDataUpdated(this.model);
      }
    });

    // 2. FARM_INVENTORY (Cmd.INVENTORY = 60)
    this.network.on('farm_inventory', (data: any) => {
      console.log('[FarmNetwork] Received farm_inventory:', data);
      this.model.updateFromInventoryPayload(data);
      if (this.onInventoryUpdated) {
        this.onInventoryUpdated(this.model);
      }
    });

    // 3. PLANT_SEED (Cmd.PLANT_SEED = 64)
    this.network.on('plant_seed', (data: { userId: number; cellIndex: number; seedId: number }) => {
      console.log(`[FarmNetwork] Plant seed confirmed: Cell ${data.cellIndex}, Seed ${data.seedId}`);
      if (this.model.lands[data.cellIndex]) {
        const cell = this.model.lands[data.cellIndex];
        cell.type = data.seedId;
        cell.plantedMinutes = 0;
        cell.sucKhoe = 100;
        cell.isWatered = false;
        cell.isFertilized = false;
        cell.isHarvestable = false;
        cell.localPlantedTimestamp = Date.now();

        // Decrement local inventory count
        const curSeeds = this.model.seeds.get(data.seedId) || 0;
        if (curSeeds > 0) {
          this.model.seeds.set(data.seedId, curSeeds - 1);
        }
      }

      if (this.onPlantSeedSuccess) {
        this.onPlantSeedSuccess(data.cellIndex, data.seedId);
      }
    });

    // 4. TREE_HARVEST (Cmd.TREE_HARVEST = 66)
    this.network.on('tree_harvest', (data: { cellIndex: number; yieldCount: number }) => {
      console.log(`[FarmNetwork] Tree harvest confirmed: Cell ${data.cellIndex}, Yield: ${data.yieldCount}`);
      if (this.model.lands[data.cellIndex]) {
        const cell = this.model.lands[data.cellIndex];
        const oldType = cell.type;
        cell.type = -1; // reset to empty plot
        cell.plantedMinutes = 0;
        cell.isHarvestable = false;

        // Increment local inventory crops
        if (oldType >= 0) {
          const curCrops = this.model.crops.get(oldType) || 0;
          this.model.crops.set(oldType, curCrops + data.yieldCount);
        }
      }

      if (this.onHarvestSuccess) {
        this.onHarvestSuccess(data.cellIndex, data.yieldCount);
      }
    });

    // 5. OPEN_LAND (Cmd.OPEN_LAND = 70)
    this.network.on('open_land', (data: { farmId: number; slot: number; typeBuy: number; msg: string; xu: number; luong: number }) => {
      console.log(`[FarmNetwork] Open land confirmed: Slot ${data.slot}`);
      if (this.model.landSize < this.model.maxLandPlots) {
        const nextIdx = this.model.landSize;
        if (this.model.lands[nextIdx]) {
          this.model.lands[nextIdx].type = -1; // unlocked empty soil
        }
        this.model.landSize++;
      }
      if (data.xu > 0) this.model.userXu = data.xu;
      if (data.luong > 0) this.model.userLuong = data.luong;

      if (this.onOpenLandSuccess) {
        this.onOpenLandSuccess(data.slot, data.xu, data.luong);
      }
      if (this.onNotification) {
        this.onNotification(data.msg || 'Đã mở ô đất thành công!');
      }
    });

    // 6. Server Dialog Notification
    this.network.on('server_dialog', (dialog: { title: string; content: string }) => {
      if (this.onNotification) {
        this.onNotification(dialog.content || dialog.title);
      }
    });
  }

  // --- Network Action Requests ---

  public enterFarm(userId: number = this.network.myUserId): void {
    console.log(`[FarmNetwork] Entering Farm for User: ${userId}`);
    this.model.userId = userId;
    this.network.sendGetHandler(10); // Handler 10 = FarmMsgHandler
    this.network.sendJoinFarm(userId);
    this.network.sendGetFarmInventory();
  }

  public plantSeed(cellIndex: number, seedId: number): void {
    if (!this.model.lands[cellIndex] || this.model.lands[cellIndex].type !== -1) {
      if (this.onNotification) this.onNotification('Ô đất không thể gieo hạt!');
      return;
    }
    const seedCount = this.model.seeds.get(seedId) || 0;
    if (seedCount <= 0) {
      if (this.onNotification) this.onNotification('Bạn đã hết hạt giống này trong kho!');
      return;
    }
    this.network.sendPlantSeed(this.model.userId, cellIndex, seedId);
  }

  public harvestCrop(cellIndex: number): void {
    const cell = this.model.lands[cellIndex];
    if (!cell || cell.type < 0) {
      return;
    }
    this.network.sendTreeHarvest(this.model.userId, cellIndex);
  }

  public openLand(typeBuy: number = 1): void {
    this.network.sendOpenLand(this.model.userId, typeBuy);
  }

  public buySeed(seedId: number, quantity: number = 1, currencyType: number = 1): void {
    this.network.sendBuyFarmItem(seedId, quantity, currencyType);
    // Refresh inventory after buy
    setTimeout(() => {
      this.network.sendGetFarmInventory();
    }, 400);
  }

  public requestInventory(): void {
    this.network.sendGetFarmInventory();
  }
}

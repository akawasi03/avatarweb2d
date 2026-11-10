/**
 * FarmActionController.ts
 * Coordinates user interaction, tool selection, cursor navigation and action dispatching on FarmScreen.
 * Strictly enforces Server Authority: no client balance mutation, no client-side watering/fertilizer simulation,
 * and mature-only crop harvesting validation.
 */

import { FarmModel, LandItemState, CROP_DEFINITIONS } from './FarmModel.js';
import { FarmNetworkHandler } from './FarmNetworkHandler.js';

export enum FarmToolMode {
  HAND = 'hand',
  PLANT = 'plant',
  HARVEST = 'harvest',
  OPEN_LAND = 'open_land'
}

export class FarmActionController {
  public model: FarmModel;
  public handler: FarmNetworkHandler;

  public currentTool: FarmToolMode = FarmToolMode.HAND;
  public selectedSeedId: number = 0; // Default: Cà chua
  public focusedCellIndex: number = 0;

  // Active UI Modals
  public isSeedPickerOpen = false;
  public isShopOpen = false;
  public isWarehouseOpen = false;
  public isNeighborListOpen = false;

  public onActionFeedback?: (text: string, color?: string) => void;

  constructor(model: FarmModel, handler: FarmNetworkHandler) {
    this.model = model;
    this.handler = handler;
  }

  public setTool(tool: FarmToolMode): void {
    this.currentTool = tool;
    const nameMap: Record<FarmToolMode, string> = {
      [FarmToolMode.HAND]: 'Kiểm tra',
      [FarmToolMode.PLANT]: 'Gieo hạt',
      [FarmToolMode.HARVEST]: 'Thu hoạch',
      [FarmToolMode.OPEN_LAND]: 'Mở đất'
    };
    if (this.onActionFeedback) {
      this.onActionFeedback(`Công cụ: ${nameMap[tool]}`);
    }
  }

  public selectSeed(seedId: number): void {
    this.selectedSeedId = seedId;
    this.currentTool = FarmToolMode.PLANT;
    this.isSeedPickerOpen = false;
    const cropName = CROP_DEFINITIONS[seedId]?.name || `Hạt #${seedId}`;
    if (this.onActionFeedback) {
      this.onActionFeedback(`Đã chọn hạt giống: ${cropName}`);
    }
  }

  public handleCellClick(cellIndex: number): void {
    this.focusedCellIndex = cellIndex;
    const cell = this.model.lands[cellIndex];
    if (!cell) return;

    // Server Authority Check: Visiting neighbor's farm is Read-Only
    const isOwner = !this.model.userId || this.model.userId === (this.handler.network.myUserId || 1);
    if (!isOwner) {
      if (this.onActionFeedback) {
        this.onActionFeedback('Bạn đang thăm nông trại của người khác! Không thể thao tác.', '#ef4444');
      }
      return;
    }

    // Case 1: Locked / Unopened Plot
    if (cell.type === -2) {
      if (cellIndex === this.model.landSize) {
        // Can open next sequential plot via authoritative server packet
        this.handler.openLand(1); // 1 = Xu
        if (this.onActionFeedback) {
          this.onActionFeedback('Đang gửi yêu cầu mở ô đất lên máy chủ...', '#facc15');
        }
      } else {
        if (this.onActionFeedback) {
          this.onActionFeedback('Vui lòng mở ô đất theo thứ tự lần lượt!', '#ef4444');
        }
      }
      return;
    }

    // Case 2: Empty Soil (Ready to plant)
    if (cell.type === -1) {
      const availSeeds = this.model.seeds.get(this.selectedSeedId) || 0;
      if (availSeeds > 0) {
        this.handler.plantSeed(cellIndex, this.selectedSeedId);
        const name = CROP_DEFINITIONS[this.selectedSeedId]?.name || 'cây';
        if (this.onActionFeedback) {
          this.onActionFeedback(`Đang gieo ${name} vào ô #${cellIndex + 1}...`, '#4ade80');
        }
      } else {
        // Open seed picker to select available seed or visit shop
        this.isSeedPickerOpen = true;
        if (this.onActionFeedback) {
          this.onActionFeedback('Chọn hạt giống trong kho để gieo!', '#38bdf8');
        }
      }
      return;
    }

    // Case 3: Mature Crop (Ready to harvest)
    const stage = this.model.getGrowthStage(cell);
    if (cell.isHarvestable || stage === 7) {
      this.handler.harvestCrop(cellIndex);
      const name = CROP_DEFINITIONS[cell.type]?.name || 'nông sản';
      if (this.onActionFeedback) {
        this.onActionFeedback(`Đang thu hoạch ${name} ô #${cellIndex + 1}...`, '#facc15');
      }
      return;
    }

    // Case 4: Growing Crop (Server Authority: Disallow harvesting unripened crops)
    const name = CROP_DEFINITIONS[cell.type]?.name || 'Cây';
    const meta = CROP_DEFINITIONS[cell.type];
    const totalMin = meta ? meta.growMinutes : 100;
    const remainMin = Math.max(0, totalMin - cell.plantedMinutes);

    if (this.onActionFeedback) {
      this.onActionFeedback(
        `Cây chưa chín! ${name} (Ô #${cellIndex + 1}): Còn ${remainMin} phút nữa mới có thể thu hoạch.`,
        '#ef4444'
      );
    }
  }

  public harvestAllMature(): void {
    const isOwner = !this.model.userId || this.model.userId === (this.handler.network.myUserId || 1);
    if (!isOwner) {
      if (this.onActionFeedback) {
        this.onActionFeedback('Bạn đang thăm nông trại của người khác! Không thể thao tác.', '#ef4444');
      }
      return;
    }

    let harvestedCount = 0;
    for (const cell of this.model.lands) {
      if (cell.type >= 0) {
        const stage = this.model.getGrowthStage(cell);
        if (cell.isHarvestable || stage === 7) {
          this.handler.harvestCrop(cell.index);
          harvestedCount++;
        }
      }
    }
    if (this.onActionFeedback) {
      if (harvestedCount > 0) {
        this.onActionFeedback(`Đang thu hoạch ${harvestedCount} ô đất chín...`, '#facc15');
      } else {
        this.onActionFeedback('Chưa có cây nào chín để thu hoạch!', '#94a3b8');
      }
    }
  }

  public plantAllEmpty(): void {
    const isOwner = !this.model.userId || this.model.userId === (this.handler.network.myUserId || 1);
    if (!isOwner) {
      if (this.onActionFeedback) {
        this.onActionFeedback('Bạn đang thăm nông trại của người khác! Không thể thao tác.', '#ef4444');
      }
      return;
    }

    const availSeeds = this.model.seeds.get(this.selectedSeedId) || 0;
    if (availSeeds <= 0) {
      this.isSeedPickerOpen = true;
      if (this.onActionFeedback) {
        this.onActionFeedback('Vui lòng chọn hạt giống có sẵn trong kho!', '#ef4444');
      }
      return;
    }

    let planted = 0;
    for (const cell of this.model.lands) {
      if (cell.type === -1 && planted < availSeeds) {
        this.handler.plantSeed(cell.index, this.selectedSeedId);
        planted++;
      }
    }

    if (this.onActionFeedback) {
      if (planted > 0) {
        this.onActionFeedback(`Đang gieo ${planted} ô đất hạt giống...`, '#4ade80');
      } else {
        this.onActionFeedback('Không còn ô đất trống để gieo!', '#94a3b8');
      }
    }
  }
}

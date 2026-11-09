/**
 * FarmModel.ts
 * Data structures and domain models for Avatar Teamobi 2.5.8 Farm System (Map 25).
 * Reverse-engineered directly from Java Server (FarmService.java, LandItem.java, Animal.java, farmitems).
 */

export interface CropMetadata {
  id: number;
  name: string;
  growMinutes: number;
  harvestYield: number;
  seedPriceXu: number;
  sellPriceXu: number;
  stageImgs: number[]; // 8 sprite indices corresponding to /assets/farm/{id}.png
}

export const CROP_DEFINITIONS: Record<number, CropMetadata> = {
  0: {
    id: 0,
    name: 'Cà Chua',
    growMinutes: 260,
    harvestYield: 75,
    seedPriceXu: 24,
    sellPriceXu: 10,
    stageImgs: [0, 1, 2, 3, 4, 5, 6, 37]
  },
  1: {
    id: 1,
    name: 'Cà Rốt',
    growMinutes: 380,
    harvestYield: 108,
    seedPriceXu: 36,
    sellPriceXu: 10,
    stageImgs: [0, 1, 2, 3, 7, 8, 9, 38]
  },
  2: {
    id: 2,
    name: 'Khóm',
    growMinutes: 600,
    harvestYield: 165,
    seedPriceXu: 50,
    sellPriceXu: 10,
    stageImgs: [0, 1, 2, 3, 10, 11, 12, 39]
  },
  3: {
    id: 3,
    name: 'Dưa Hấu',
    growMinutes: 480,
    harvestYield: 138,
    seedPriceXu: 45,
    sellPriceXu: 10,
    stageImgs: [0, 1, 2, 3, 13, 14, 15, 40]
  },
  4: {
    id: 4,
    name: 'Nho',
    growMinutes: 960,
    harvestYield: 240,
    seedPriceXu: 80,
    sellPriceXu: 10,
    stageImgs: [0, 1, 2, 3, 16, 17, 18, 41]
  },
  5: {
    id: 5,
    name: 'Hoa Hồng',
    growMinutes: 120,
    harvestYield: 45,
    seedPriceXu: 20,
    sellPriceXu: 10,
    stageImgs: [0, 1, 2, 3, 19, 20, 21, 42]
  },
  6: {
    id: 6,
    name: 'Lúa',
    growMinutes: 2280,
    harvestYield: 720,
    seedPriceXu: 120,
    sellPriceXu: 10,
    stageImgs: [0, 1, 2, 3, 22, 23, 24, 43]
  },
  7: {
    id: 7,
    name: 'Xoài',
    growMinutes: 1440,
    harvestYield: 360,
    seedPriceXu: 100,
    sellPriceXu: 10,
    stageImgs: [0, 1, 2, 3, 25, 26, 27, 44]
  },
  8: {
    id: 8,
    name: 'Thanh Long',
    growMinutes: 720,
    harvestYield: 189,
    seedPriceXu: 60,
    sellPriceXu: 10,
    stageImgs: [0, 1, 2, 3, 28, 29, 30, 45]
  },
  9: {
    id: 9,
    name: 'Hoa Hướng Dương',
    growMinutes: 720,
    harvestYield: 189,
    seedPriceXu: 65,
    sellPriceXu: 10,
    stageImgs: [0, 1, 2, 3, 31, 32, 33, 46]
  },
  10: {
    id: 10,
    name: 'Hoa Tulip',
    growMinutes: 360,
    harvestYield: 108,
    seedPriceXu: 40,
    sellPriceXu: 10,
    stageImgs: [0, 1, 2, 3, 34, 35, 36, 47]
  }
};

export interface LandItemState {
  index: number;
  type: number; // -1 = Empty plot, >= 0 = seedId, -2 = Unopened / Locked plot
  plantedMinutes: number;
  sucKhoe: number; // 0 - 100
  isWatered: boolean;
  isFertilized: boolean;
  isHarvestable: boolean;
  localPlantedTimestamp?: number; // client-side simulation clock
  col: number; // grid column (0..5)
  row: number; // grid row (0..4)
  posX: number; // world pixel coordinate X
  posY: number; // world pixel coordinate Y
}

export interface AnimalState {
  id: number;
  health: number;
  level: number;
  resourceCount: number;
  nextProductionTime: number;
  isAlive: boolean;
  isReadyForBreeding: boolean;
  isHarvestable: boolean;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  animFrame: number;
  moveTimer: number;
}

export interface InventoryItem {
  id: number;
  quantity: number;
}

export class FarmModel {
  public userId: number = 0;
  public ownerName: string = '';
  public landSize: number = 0;
  public maxLandPlots: number = 30; // 5 columns x 6 rows = 30 plots
  public lands: LandItemState[] = [];
  public animals: AnimalState[] = [];
  public starFruitLevel: number = 10;
  public starFruitFruit: number = 0;
  public barnSize: number = 10;
  public fishPondSize: number = 10;

  public seeds: Map<number, number> = new Map();
  public crops: Map<number, number> = new Map();
  public fertilizers: Map<number, number> = new Map();
  public specialCrops: Map<number, number> = new Map();

  public userXu: number = 0;
  public userLuong: number = 0;
  public farmLevel: number = 1;
  public farmPercent: number = 0;

  // Farm grid layout anchor: centered on Map 25
  public static readonly GRID_COLS = 6;
  public static readonly GRID_ROWS = 5;
  public static readonly CELL_WIDTH = 48;
  public static readonly CELL_HEIGHT = 28;
  public static readonly GRID_ORIGIN_X = 140;
  public static readonly GRID_ORIGIN_Y = 160;

  constructor() {
    this.resetPlots(8);
  }

  public resetPlots(activeCount: number): void {
    this.landSize = activeCount;
    this.lands = [];
    for (let i = 0; i < this.maxLandPlots; i++) {
      const col = i % FarmModel.GRID_COLS;
      const row = Math.floor(i / FarmModel.GRID_COLS);
      const posX = FarmModel.GRID_ORIGIN_X + col * FarmModel.CELL_WIDTH;
      const posY = FarmModel.GRID_ORIGIN_Y + row * FarmModel.CELL_HEIGHT;

      this.lands.push({
        index: i,
        type: i < activeCount ? -1 : -2,
        plantedMinutes: 0,
        sucKhoe: 100,
        isWatered: false,
        isFertilized: false,
        isHarvestable: false,
        col,
        row,
        posX,
        posY
      });
    }
  }

  public updateFromJoinPayload(data: {
    userId: number;
    landItems: Array<{
      type: number;
      plantedMinutes?: number;
      sucKhoe?: number;
      isWatered?: boolean;
      isFertilized?: boolean;
      isHarvestable?: boolean;
    }>;
    animals: Array<{
      id: number;
      health: number;
      level: number;
      resourceCount: number;
      nextProductionTime: number;
      isAlive: boolean;
      isReadyForBreeding: boolean;
      isHarvestable: boolean;
    }>;
    barnSize: number;
    fishPondSize: number;
    starFruit: { level: number; fruit: number };
  }): void {
    this.userId = data.userId;
    this.barnSize = data.barnSize || 10;
    this.fishPondSize = data.fishPondSize || 10;
    this.starFruitLevel = data.starFruit?.level || 10;
    this.starFruitFruit = data.starFruit?.fruit || 0;
    this.landSize = data.landItems.length;

    this.resetPlots(data.landItems.length);

    const now = Date.now();
    for (let i = 0; i < data.landItems.length; i++) {
      const item = data.landItems[i];
      if (this.lands[i]) {
        this.lands[i].type = item.type;
        this.lands[i].plantedMinutes = item.plantedMinutes || 0;
        this.lands[i].sucKhoe = item.sucKhoe !== undefined ? item.sucKhoe : 100;
        this.lands[i].isWatered = !!item.isWatered;
        this.lands[i].isFertilized = !!item.isFertilized;
        this.lands[i].isHarvestable = !!item.isHarvestable;
        this.lands[i].localPlantedTimestamp = now - (this.lands[i].plantedMinutes * 60 * 1000);
      }
    }

    // Populate animals
    this.animals = [];
    if (data.animals) {
      for (let i = 0; i < data.animals.length; i++) {
        const a = data.animals[i];
        const sx = 440 + (i % 3) * 30;
        const sy = 160 + Math.floor(i / 3) * 25;
        this.animals.push({
          ...a,
          x: sx,
          y: sy,
          targetX: sx,
          targetY: sy,
          animFrame: 0,
          moveTimer: 0
        });
      }
    }
  }

  public updateFromInventoryPayload(data: {
    seeds: Array<{ id: number; quantity: number }>;
    crops: Array<{ id: number; quantity: number }>;
    xu: number;
    farmLevel: number;
    farmPercent: number;
    fertilizers: Array<{ id: number; quantity: number }>;
    specialCrops: Array<{ id: number; quantity: number }>;
  }): void {
    this.seeds.clear();
    for (const s of data.seeds) {
      if (s.quantity > 0) this.seeds.set(s.id, s.quantity);
    }

    this.crops.clear();
    for (const c of data.crops) {
      if (c.quantity > 0) this.crops.set(c.id, c.quantity);
    }

    this.fertilizers.clear();
    for (const f of data.fertilizers) {
      if (f.quantity > 0) this.fertilizers.set(f.id, f.quantity);
    }

    this.specialCrops.clear();
    for (const sp of data.specialCrops) {
      if (sp.quantity > 0) this.specialCrops.set(sp.id, sp.quantity);
    }

    this.userXu = data.xu;
    this.farmLevel = data.farmLevel;
    this.farmPercent = data.farmPercent;
  }

  public getGrowthStage(cell: LandItemState): number {
    if (cell.type < 0) return -1;
    const meta = CROP_DEFINITIONS[cell.type];
    if (!meta) return 0;

    // If server flagged harvestable or elapsed minutes >= growMinutes
    if (cell.isHarvestable || cell.plantedMinutes >= meta.growMinutes) {
      return 7; // Mature ripe stage
    }

    const ratio = Math.max(0, Math.min(1, cell.plantedMinutes / meta.growMinutes));
    // 0: seedling -> 1..6: growing -> 7: ripe
    return Math.min(6, Math.floor(ratio * 7));
  }

  public getCropSpriteId(cell: LandItemState): number {
    if (cell.type < 0) return -1;
    const meta = CROP_DEFINITIONS[cell.type];
    if (!meta) return 0;

    const stage = this.getGrowthStage(cell);
    return meta.stageImgs[stage] !== undefined ? meta.stageImgs[stage] : meta.stageImgs[0];
  }
}

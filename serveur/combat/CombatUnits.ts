export interface CombatStats {
  attack: number;
  attackSpeed: number;
  critChance: number;
  critMultiplier: number;
  dodgeChance: number;
  armor: number;
  magicResist: number;
  manaRegen: number;
}

export interface CombatUnitBase {
  id: string;
  hp: number;
  maxHp: number;
  isAlive: boolean;
}

export interface CombatHeroState extends CombatUnitBase {
  isMercenary: false;
  mana: number;
  stats: CombatStats;
  cards: Map<string, number>;
}

export interface CombatMercenaryState extends CombatUnitBase {
  isMercenary: true;
  ownerHeroId: string;
  attack: number;
  attackSpeed: number;
}

export type CombatUnitState =
  | CombatHeroState
  | CombatMercenaryState;

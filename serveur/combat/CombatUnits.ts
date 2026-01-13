import { TemporaryBuff } from "./buffs/TemporaryBuff";
import { HeroDefinition } from "../heroes/HeroDefinition";

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

export interface CombatHeroState {
  id: string;

  definition: HeroDefinition;

  level: number;

  baseStats: HeroDefinition["baseStats"];

  stats: {
    maxHp: number;
    attack: number;
    armor: number;
    attackSpeed: number;
    manaRegen: number;
    critChance: number;
    critMultiplier: number;
    dodgeChance: number;
  };

  hp: number;
  mana: number;

  genres: Map<string, number>;
  cards: Map<string, number>;
  buffs: TemporaryBuff[];
  stacks: Record<string, number>;

  passive: HeroDefinition["passive"];

  timers: Record<string, number>;

  isAlive: boolean;
  isMercenary: false;
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

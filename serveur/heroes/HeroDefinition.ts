import { HeroPassive } from "./passives/HeroPassive";

export interface HeroLevelScaling {
  maxHp: number;
  attack: number;
  armor: number;
  attackSpeed: number;
  manaRegen?: number;
}

export interface HeroDefinition {
  id: string;
  name: string;

  baseStats: {
    maxHp: number;
    attack: number;
    armor: number;
    attackSpeed: number;
    manaRegen: number;
    critChance: number;
    critMultiplier: number;
    dodgeChance: number;
  };

  levelScaling: HeroLevelScaling;

  passive: HeroPassive;
}

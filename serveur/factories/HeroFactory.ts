import { CombatHeroState } from "../combat/CombatUnits";
import { HeroDefinition } from "../heroes/HeroDefinition";

export function createHero(def: HeroDefinition): CombatHeroState {
  return {
    id: crypto.randomUUID(),

    definition: def,

    level: 1,

    baseStats: { ...def.baseStats },
    stats: { ...def.baseStats },

    hp: def.baseStats.maxHp,
    mana: 0,

    genres: new Map(),
    cards: new Map(),
    buffs: [],
    stacks: {},

    passive: def.passive,

    timers: {},

    isAlive: true,
    isMercenary: false
  };
}

import { HeroDefinition } from "./HeroDefinition";
import { FlameAdeptPassive } from "./passives/FlameAdeptPassive";

export const FireMage: HeroDefinition = {
  id: "fire_mage",
  name: "Mage de Feu",

  baseStats: {
    maxHp: 900,
    attack: 40,
    armor: 20,
    attackSpeed: 1,
    manaRegen: 5
  },

  levelScaling: {
    maxHp: 110,
    attack: 6,
    armor: 4,
    attackSpeed: 0.025,
    manaRegen: 0.3
  },

  passive: new FlameAdeptPassive()
};

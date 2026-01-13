import { CombatHeroState } from "../CombatUnits";

export function applyLevelScaling(hero: CombatHeroState) {
  const scaling = hero.definition.levelScaling;

  hero.stats.maxHp =
    hero.baseStats.maxHp +
    scaling.maxHp * (hero.level - 1);

  hero.stats.attack =
    hero.baseStats.attack +
    scaling.attack * (hero.level - 1);

  hero.stats.armor =
    hero.baseStats.armor +
    scaling.armor * (hero.level - 1);

  hero.stats.attackSpeed =
    hero.baseStats.attackSpeed *
    (1 + scaling.attackSpeed * (hero.level - 1));

  hero.stats.manaRegen =
    hero.baseStats.manaRegen +
    (scaling.manaRegen ?? 0) * (hero.level - 1);
}

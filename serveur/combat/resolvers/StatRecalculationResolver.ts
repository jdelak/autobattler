import { CombatHeroState } from "../CombatUnits";

export function recalcMaxHp(hero: CombatHeroState) {
  const level = hero.cards.get("force_tyrannique");
  if (!level) return;

  const perCard = [15, 30, 45, 60, 90][level - 1];

  const armesCount = [...hero.cards.keys()].filter(id =>
    id.startsWith("armes_")
  ).length;

  const bonusHp = armesCount * perCard;
  const ratio = hero.hp / hero.baseStats.maxHp;

  hero.stats.maxHp = hero.baseStats.maxHp + bonusHp;
  hero.hp = hero.stats.maxHp * ratio;
}

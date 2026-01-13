import { CombatHeroState } from "../CombatUnits";

export function computeHeroLevel(hero: CombatHeroState): number {
  let total = 1;

  for (const level of hero.genres.values()) {
    total += level;
  }

  return total;
}

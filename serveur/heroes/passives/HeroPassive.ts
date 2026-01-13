import { CombatEventBus } from "../../combat/events/CombatEventBus";
import { CombatHeroState } from "../../combat/CombatUnits";

export interface HeroPassive {
  register(
    hero: CombatHeroState,
    eventBus: CombatEventBus
  ): void;
}

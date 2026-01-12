import { CombatEventBus } from "../events/CombatEventBus";
import { CombatHeroState } from "../CombatUnits";

export class CombatTickResolver {
  constructor(_: CombatEventBus) {}

  tick(_: CombatHeroState[]) {}
}

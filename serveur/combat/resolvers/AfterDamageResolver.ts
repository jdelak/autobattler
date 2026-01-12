import { CombatEventBus } from "../events/CombatEventBus";

export class AfterDamageResolver {
  constructor(private eventBus: CombatEventBus) {
    this.eventBus.subscribe("afterDamage", () => {});
  }
}

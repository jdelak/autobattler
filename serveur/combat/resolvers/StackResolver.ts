import { CombatEventBus } from "../events/CombatEventBus";

export class StackResolver {
  constructor(private eventBus: CombatEventBus) {
    this.eventBus.subscribe("applyStack", () => {});
  }
}

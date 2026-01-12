import { CombatEventBus } from "../events/CombatEventBus";
import { CombatHeroState } from "../CombatUnits";

export class HealResolver {
  constructor(private eventBus: CombatEventBus) {
    this.eventBus.subscribe("heal", this.onHeal.bind(this));
  }

  onHeal(payload: { target: CombatHeroState; amount: number }) {
    payload.target.hp = Math.min(
      payload.target.maxHp,
      payload.target.hp + payload.amount
    );
  }
}

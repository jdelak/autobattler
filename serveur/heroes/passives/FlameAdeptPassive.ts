import { CombatEventBus } from "../../combat/events/CombatEventBus";
import { CombatHeroState } from "../../combat/CombatUnits";
import { HeroPassive } from "./HeroPassive";

export class FlameAdeptPassive implements HeroPassive {
  register(hero: CombatHeroState, eventBus: CombatEventBus) {
    eventBus.subscribe("onUltimate", (event) => {
      const { caster } = (event as any).payload;
      if (caster !== hero) return;

      const stacks = hero.level * 2;

      eventBus.emit({
        type: "applyStack",
        payload: {
          source: hero,
          target: caster.enemy,
          stack: "fire",
          amount: stacks
        }
      });
    });
  }
}

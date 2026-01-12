import { CombatEventBus } from "../events/CombatEventBus";
import { CombatHeroState } from "../CombatUnits";

export class UltimateResolver {
  constructor(private eventBus: CombatEventBus) {}

  update(_: number, heroes: CombatHeroState[]) {
    for (const hero of heroes) {
      if (hero.mana >= 100) {
        hero.mana = 0;
        this.castUltimate(hero, heroes.find(h => h.id !== hero.id)!);
      }
    }
  }

  castUltimate(caster: CombatHeroState, target: CombatHeroState) {
    const damage = caster.stats.attack * 2;
    target.hp -= damage;
    target.isAlive = target.hp > 0;

    this.eventBus.emit({
      type: "afterDamage",
      payload: {
        source: caster,
        target,
        damage,
        isCritical: false,
        isBasicAttack: false,
        isUltimate: true
      }
    });
  }
}

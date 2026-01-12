import { CombatEventBus } from "../events/CombatEventBus";
import { CombatHeroState } from "../CombatUnits";

export class AttackResolver {
  constructor(private eventBus: CombatEventBus) {}

  update(_: number, heroes: CombatHeroState[]) {
    if (heroes.length < 2) return;
    this.basicAttack(heroes[0], heroes[1]);
    this.basicAttack(heroes[1], heroes[0]);
  }

  basicAttack(attacker: CombatHeroState, defender: CombatHeroState) {
    let damage = attacker.stats.attack;
    const crit = Math.random() < attacker.stats.critChance;
    if (crit) damage *= attacker.stats.critMultiplier;

    defender.hp -= damage;
    defender.isAlive = defender.hp > 0;

    attacker.mana = Math.min(100, attacker.mana + 5);

    this.eventBus.emit({
      type: "afterDamage",
      payload: {
        source: attacker,
        target: defender,
        damage,
        isCritical: crit,
        isBasicAttack: true,
        isUltimate: false
      }
    });
  }
}

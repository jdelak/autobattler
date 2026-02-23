import { Hero } from "./Hero"
import { GameConfig } from "../config/GameConfig"

export class DamageCalculator {

  static performAttack(attacker: Hero, defender: Hero) {

    const dodge = Math.min(
      defender.stats.dodgeChance,
      GameConfig.MAX_DODGE_CAP
    )

    if (Math.random() < dodge) return

    let damage = attacker.stats.attack

    if (Math.random() < attacker.stats.critChance) {
      damage *= (1 + attacker.stats.critDamage)
    }

    damage += defender.stacks.fire
    damage -= defender.stacks.shield

    if (damage < 0) damage = 0

    defender.stats.currentHP -= damage

    if (defender.stats.currentHP < 0)
      defender.stats.currentHP = 0
  }
}

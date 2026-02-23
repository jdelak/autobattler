import { Hero } from "./Hero"
import { DamageCalculator } from "./DamageCalculator"
import { StackManager } from "./StackManager"
import { GameConfig } from "../config/GameConfig"

export class BattleEngine {

  heroA: Hero
  heroB: Hero
  elapsedTime = 0
  isFinished = false

  constructor(heroA: Hero, heroB: Hero) {
    this.heroA = heroA
    this.heroB = heroB
  }

  update(deltaTime: number) {

    if (this.isFinished) return

    this.elapsedTime += deltaTime

    this.processHero(this.heroA, this.heroB, deltaTime)
    this.processHero(this.heroB, this.heroA, deltaTime)

    StackManager.applyPoison(this.heroA, deltaTime)
    StackManager.applyPoison(this.heroB, deltaTime)

    StackManager.decay(this.heroA, deltaTime)
    StackManager.decay(this.heroB, deltaTime)

    this.checkEnd()
  }

  processHero(attacker: Hero, defender: Hero, deltaTime: number) {

    attacker.attackCooldown -= deltaTime

    const hasteMultiplier =
      1 + (attacker.stacks.haste * 0.01)
        - (attacker.stacks.ice * 0.01)

    const attackSpeed =
      attacker.stats.attackSpeed * hasteMultiplier

    const interval = 1000 / attackSpeed

    if (attacker.attackCooldown <= 0) {
      attacker.attackCooldown = interval
      DamageCalculator.performAttack(attacker, defender)
    }
  }

  checkEnd() {
    if (
      this.heroA.stats.currentHP <= 0 ||
      this.heroB.stats.currentHP <= 0 ||
      this.elapsedTime >= GameConfig.MAX_FIGHT_DURATION
    ) {
      this.isFinished = true
    }
  }

  getWinner(): "A" | "B" | "DRAW" {

    const hpA =
      this.heroA.stats.currentHP / this.heroA.stats.maxHP

    const hpB =
      this.heroB.stats.currentHP / this.heroB.stats.maxHP

    if (hpA > hpB) return "A"
    if (hpB > hpA) return "B"

    return "DRAW"
  }
}

import { Hero } from "./Hero"
import { GameConfig } from "../config/GameConfig"

export class StackManager {

  static applyPoison(hero: Hero, deltaTime: number) {
    if (hero.stacks.poison <= 0) return

    const damage = hero.stacks.poison * (deltaTime / 1000)

    hero.stats.currentHP -= damage

    if (hero.stats.currentHP < 0)
      hero.stats.currentHP = 0
  }

  static decay(hero: Hero, deltaTime: number) {

    const decayFactor =
      1 - (GameConfig.STACK_DECAY_PER_SECOND * (deltaTime / 1000))

    hero.stacks.fire *= decayFactor
    hero.stacks.poison *= decayFactor
    hero.stacks.haste *= decayFactor
    hero.stacks.ice *= decayFactor
    hero.stacks.shield *= decayFactor
  }
}

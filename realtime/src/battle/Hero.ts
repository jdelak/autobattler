import { HeroStats } from "./Stats"
import { HeroStacks } from "./Stacks"

export class Hero {

  stats: HeroStats
  stacks: HeroStacks
  attackCooldown = 0

  constructor(stats: HeroStats) {
    this.stats = stats

    this.stacks = {
      fire: 0,
      poison: 0,
      haste: 0,
      ice: 0,
      shield: 0
    }
  }
}


import { Room } from "colyseus"
import { Hero } from "../battle/Hero"
import { BattleEngine } from "../battle/BattleEngine"
import { GameConfig } from "../config/GameConfig"

export class BattleRoom extends Room {

  engine!: BattleEngine
  interval!: NodeJS.Timeout

  onCreate() {

    this.onMessage("start", () => {
      this.startBattle()
    })
  }

  startBattle() {

    const heroA = new Hero({
      maxHP: 1000,
      currentHP: 1000,
      attack: 50,
      attackSpeed: 1,
      critChance: 0.1,
      critDamage: 0.5,
      armor: 0,
      magicResist: 0,
      dodgeChance: 0.1
    })

    const heroB = new Hero({
      maxHP: 1000,
      currentHP: 1000,
      attack: 45,
      attackSpeed: 1.2,
      critChance: 0.05,
      critDamage: 0.5,
      armor: 0,
      magicResist: 0,
      dodgeChance: 0.05
    })

    this.engine = new BattleEngine(heroA, heroB)

    this.interval = setInterval(() => {
      this.engine.update(GameConfig.TICK_RATE)

      if (this.engine.isFinished) {
        clearInterval(this.interval)

        this.broadcast("result", {
          winner: this.engine.getWinner()
        })
      }

    }, GameConfig.TICK_RATE)
  }
}

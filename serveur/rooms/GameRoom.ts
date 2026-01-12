import { Room, Client } from "colyseus";
import { CombatResolver } from "../combat/CombatResolver";
import { CombatHeroState } from "../combat/CombatUnits";

export class GameRoom extends Room {
  private combat!: CombatResolver;
  private heroes: CombatHeroState[] = [];

  onCreate() {
    this.setSimulationInterval((delta) => {
      if (this.combat) {
        this.combat.update(delta / 1000);
      }
    });
  }

  onJoin(client: Client) {
    const hero: CombatHeroState = {
      id: client.sessionId,
      isMercenary: false,
      hp: 1000,
      maxHp: 1000,
      mana: 0,
      isAlive: true,
      stats: {
        attack: 50,
        attackSpeed: 1,
        critChance: 0.1,
        critMultiplier: 2,
        dodgeChance: 0,
        armor: 0,
        magicResist: 0,
        manaRegen: 0
      },
      cards: new Map()
    };

    this.heroes.push(hero);

    if (this.heroes.length === 2) {
      this.combat = new CombatResolver(this.heroes);
    }
  }
}

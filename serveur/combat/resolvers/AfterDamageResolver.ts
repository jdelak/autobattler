import { CombatEventBus } from "../events/CombatEventBus";
import { CombatHeroState } from "../CombatUnits";
import { TemporaryBuff } from "../buffs/TemporaryBuff";

export class AfterDamageResolver {
  constructor(private eventBus: CombatEventBus) {
    this.register();
  }

  private register() {
    this.eventBus.subscribe("afterDamage", (event) => {
      const { attacker, target, damage } = (event as any).payload as {
        attacker: CombatHeroState;
        target: CombatHeroState;
        damage: number;
      };

      if (!attacker.isAlive || attacker.isMercenary) return;

      this.handleVampirisme(attacker);
      this.handleDoubleAttack(attacker, target);
    });

    this.eventBus.subscribe("onCrit", (event) => {
      const { hero } = (event as any).payload as { hero: CombatHeroState };
      if (!hero.isMercenary) this.handleBriseCiel(hero);
    });

    this.eventBus.subscribe("onDodge", (event) => {
      const { hero } = (event as any).payload as { hero: CombatHeroState };
      if (!hero.isMercenary) this.handleRetourDeBaton(hero);
    });
  }

  private handleVampirisme(hero: CombatHeroState) {
    const level = hero.cards.get("vampirisme");
    if (!level) return;

    const values = [15, 30, 45, 60, 90];
    const heal = values[level - 1] ?? 0;

    this.eventBus.emit({
      type: "onHeal",
      payload: { target: hero, amount: heal }
    });
  }

  private handleDoubleAttack(attacker: CombatHeroState, target: CombatHeroState) {
    const hasCard = attacker.cards.has("attaque_double");
    if (!hasCard) return;

    if (Math.random() <= 0.4) {
      this.eventBus.emit({
        type: "bonusAttack",
        payload: { attacker, target }
      });
    }
  }

  private handleBriseCiel(hero: CombatHeroState) {
    const level = hero.cards.get("brise_ciel");
    if (!level) return;

    const values = [6, 12, 18, 24, 36];
    this.addBuff(hero, "attack", values[level - 1], 1.5, 4, "brise_ciel");
  }

  private handleRetourDeBaton(hero: CombatHeroState) {
    const level = hero.cards.get("retour_baton");
    if (!level) return;

    const values = [6, 12, 18, 24, 36];
    this.addBuff(hero, "attack", values[level - 1], 1.5, 4, "retour_baton");
  }

  private addBuff(
    hero: CombatHeroState,
    stat: "attack" | "attackSpeed",
    value: number,
    duration: number,
    maxStacks: number,
    source: string
  ) {
    let buff = hero.buffs.find(b => b.source === source);

    if (!buff) {
      buff = {
        stat,
        value,
        remaining: duration,
        stacks: 1,
        maxStacks,
        source
      };
      hero.buffs.push(buff);
    } else if (buff.stacks < maxStacks) {
      buff.stacks++;
      buff.remaining = duration;
    }
  }
}

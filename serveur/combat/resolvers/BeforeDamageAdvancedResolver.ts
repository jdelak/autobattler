import { CombatHeroState } from "../CombatUnits";
import { CombatEventBus } from "../events/CombatEventBus";

export class CombatTickResolver {
  constructor(private eventBus: CombatEventBus) {}

  update(hero: CombatHeroState, delta: number, enemy: CombatHeroState) {
    if (!hero.isAlive || hero.isMercenary) return;

    hero.timers ??= {};

    this.updateBuffs(hero, delta);
    this.updateMissiles(hero, delta, enemy);
    this.updateBerserker(hero, delta);
  }

  private updateBuffs(hero: CombatHeroState, delta: number) {
    hero.buffs.forEach(buff => buff.remaining -= delta);
    hero.buffs = hero.buffs.filter(buff => buff.remaining > 0);
  }

  private updateMissiles(hero: CombatHeroState, delta: number, enemy: CombatHeroState) {
    const level = hero.cards.get("missiles_magiques");
    if (!level) return;

    hero.timers.missiles = (hero.timers.missiles ?? 0) + delta;
    if (hero.timers.missiles < 0.7) return;

    hero.timers.missiles = 0;

    const ratios = [0.5, 1, 2];
    const damage = hero.stats.attack * ratios[level - 1];

    this.eventBus.emit({
      type: "magicDamage",
      payload: { attacker: hero, target: enemy, damage }
    });
  }

  private updateBerserker(hero: CombatHeroState, delta: number) {
    const level = hero.cards.get("berserker");
    if (!level) return;

    hero.timers.berserker = (hero.timers.berserker ?? 0) + delta;
    if (hero.timers.berserker < 1) return;

    hero.timers.berserker = 0;

    const values = [0.05, 0.1, 0.2];
    const bonus = values[level - 1];

    this.addPermanentBuff(hero, bonus);
  }

  private addPermanentBuff(hero: CombatHeroState, value: number) {
    const buff = hero.buffs.find(b => b.source === "berserker");
    if (!buff) {
      hero.buffs.push({
        stat: "attackSpeed",
        value,
        remaining: 999,
        stacks: 1,
        maxStacks: 12,
        source: "berserker"
      });
    } else if (buff.stacks < 12) {
      buff.stacks++;
    }
  }
}

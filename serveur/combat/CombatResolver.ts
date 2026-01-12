import { CombatHeroState } from "./CombatUnits";
import { CombatEventBus } from "./events/CombatEventBus";
import { AttackResolver } from "./resolvers/AttackResolvers";
import { UltimateResolver } from "./resolvers/UltimateResolver";
import { StackResolver } from "./resolvers/StackResolver";
import { HealResolver } from "./resolvers/HealResolver";
import { AfterDamageResolver } from "./resolvers/AfterDamageResolver";
import { CombatTickResolver } from "./tick/CombatTickResolver";

export class CombatResolver {
  private elapsed = 0;
  private eventBus = new CombatEventBus();

  private attackResolver = new AttackResolver(this.eventBus);
  private ultimateResolver = new UltimateResolver(this.eventBus);
  private stackResolver = new StackResolver(this.eventBus);
  private healResolver = new HealResolver(this.eventBus);
  private afterDamageResolver = new AfterDamageResolver(this.eventBus);
  private tickResolver = new CombatTickResolver(this.eventBus);

  constructor(private heroes: CombatHeroState[]) {}

  update(delta: number) {
    this.elapsed += delta;

    if (this.elapsed >= 1) {
      this.elapsed = 0;
      this.tickResolver.tick(this.heroes);
    }

    this.attackResolver.update(delta, this.heroes);
    this.ultimateResolver.update(delta, this.heroes);
  }
}

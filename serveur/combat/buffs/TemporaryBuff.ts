export interface TemporaryBuff {
  stat: "attack" | "attackSpeed";
  value: number;
  remaining: number;
  stacks: number;
  maxStacks: number;
  source: string;
}


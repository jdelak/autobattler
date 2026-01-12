import { Genre } from "./Genre";
import { GenreThresholds } from "./GenreConfig";

export class GenreCalculator {
  static getLevel(points: number): number {
    if (points >= GenreThresholds[4]) return 4;
    if (points >= GenreThresholds[3]) return 3;
    if (points >= GenreThresholds[2]) return 2;
    if (points >= GenreThresholds[1]) return 1;
    return 0;
  }
}

import { logger } from "./logger";

export default class ToyRobot {
  private x: number | null;
  private y: number | null;
  private direction: string | null;
  private placed: boolean;
  private readonly tableSize: number;

  constructor(tableSize: number) {
    this.x = null;
    this.y = null;
    this.direction = null;
    this.placed = false;
    this.tableSize = tableSize;
  }

  getX(): number | null {
    return this.x;
  }

  getY(): number | null {
    return this.y;
  }

  getDirection(): string | null {
    return this.direction;
  }

  getPlaced(): boolean {
    return this.placed;
  }

  place(x: number, y: number, direction: string): void {
    if (this.isValidPosition(x, y)) {
      this.x = x;
      this.y = y;
      this.direction = direction;
      this.placed = true;
    }
  }

  move(): void {
    if (!this.placed) return;

    const newX =
      this.x! +
      (this.direction === "EAST" ? 1 : this.direction === "WEST" ? -1 : 0);
    const newY =
      this.y! +
      (this.direction === "NORTH" ? 1 : this.direction === "SOUTH" ? -1 : 0);

    if (this.isValidPosition(newX, newY)) {
      this.x = newX;
      this.y = newY;
    }
  }

  left(): void {
    if (!this.placed) return;

    this.direction = this.rotateDirection("LEFT");
  }

  right(): void {
    if (!this.placed) return;

    this.direction = this.rotateDirection("RIGHT");
  }

  generateReport(): string {
    return `Output: ${this.x},${this.y},${this.direction}`;
  }

  private rotateDirection(turn: "LEFT" | "RIGHT"): string {
    const directions = ["NORTH", "EAST", "SOUTH", "WEST"];
    const currentIndex = directions.indexOf(this.direction!);
    const newIndex =
      turn === "LEFT"
        ? (currentIndex - 1 + directions.length) % directions.length
        : (currentIndex + 1) % directions.length;

    return directions[newIndex];
  }

  private isValidPosition(x: number, y: number): boolean {
    return x >= 0 && x < this.tableSize && y >= 0 && y < this.tableSize;
  }
}

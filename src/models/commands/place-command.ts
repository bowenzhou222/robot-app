import type ToyRobot from "../toy-robot";
import type Command from "./command";

export default class PlaceCommand implements Command {
  private x: number;
  private y: number;
  private direction: string;

  constructor(x: number, y: number, direction: string) {
    this.x = x;
    this.y = y;
    this.direction = direction;
  }

  execute(robot: ToyRobot) {
    robot.place(this.x, this.y, this.direction);
  }
}

import type ToyRobot from "../toy-robot";
import  Command from "./command";

export default class MoveCommand implements Command {
  execute(robot: ToyRobot): void {
    robot.move();
  }
}

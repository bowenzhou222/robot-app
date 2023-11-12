import type ToyRobot from "../toy-robot";
import type Command from "./command";

export default class RightCommand implements Command {
  execute(robot: ToyRobot): void {
    robot.right();
  }
}

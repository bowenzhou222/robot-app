import type ToyRobot from "../toy-robot";

export default interface Command {
  execute(robot: ToyRobot): void;
}

import type GameReporter from "../game-reporter";
import type ToyRobot from "../toy-robot";
import type Command from "./command";

export default class ReportCommand implements Command {
  private reporter: GameReporter;

  constructor(reporter: GameReporter) {
    this.reporter = reporter;
  }

  execute(robot: ToyRobot): void {
    if (robot.getPlaced()) {
      this.reporter.generateReport(robot.generateReport());
    }
  }
}

import type GameReporter from "./game-reporter";
import type ToyRobot from "./toy-robot";
import CommandParser from "./command-parser";

export default class CommandProcessor {
  private robot: ToyRobot;
  private reporter: GameReporter;

  constructor(robot: ToyRobot, reporter: GameReporter) {
    this.robot = robot;
    this.reporter = reporter;
  }

  processCommands(commands: string[]): void {
    for (const commandString of commands) {
      const commandParser = new CommandParser(this.reporter);
      const command = commandParser.parse(commandString);

      if (command) {
        command.execute(this.robot);
      }
    }
  }
}

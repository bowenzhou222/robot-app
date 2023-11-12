import type Command from "./commands/command";
import type GameReporter from "./game-reporter";
import LeftCommand from "./commands/left-command";
import MoveCommand from "./commands/move-command";
import PlaceCommand from "./commands/place-command";
import ReportCommand from "./commands/report-command";
import RightCommand from "./commands/right-command";

export default class CommandParser {
  private validDirections: { [x: string]: boolean } = {
    NORTH: true,
    SOUTH: true,
    EAST: true,
    WEST: true,
  };
  private reporter: GameReporter;

  constructor(reporter: GameReporter) {
    this.reporter = reporter;
  }

  parse(command: string): Command | null {
    const [action, args] = command.split(" ");

    if (action === "PLACE") {
      return this.parsePlaceCommand(args);
    }
    return this.buildNoArgsCommand(action, args);
  }

  private buildNoArgsCommand(action: string, args: string): Command | null {
    if (this.validateNoArgs(args)) {
      switch (action) {
        case "MOVE":
          return new MoveCommand();
        case "LEFT":
          return new LeftCommand();
        case "RIGHT":
          return new RightCommand();
        case "REPORT":
          return new ReportCommand(this.reporter);
        default:
          return null;
      }
    }
    return null;
  }

  private parsePlaceCommand(args: string): Command | null {
    const [xString, yString, direction] = args?.split(",") || [];

    const x = Number(xString);
    const y = Number(yString);

    if (this.validatePlaceArgs(x, y, direction)) {
      return new PlaceCommand(x, y, direction);
    }
    return null;
  }

  private validateNoArgs(args: string): boolean {
    return args === undefined;
  }

  private validatePlaceArgs(x: number, y: number, direction: string): boolean {
    return (
      Number.isInteger(x) &&
      Number.isInteger(y) &&
      this.validDirections[direction]
    );
  }
}

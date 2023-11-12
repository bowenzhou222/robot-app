import { DEFAULT_TABLE_SIZE } from "../../src/constants";
import CommandProcessor from "../../src/models/command-processor";
import PlaceCommand from "../../src/models/commands/place-command";
import MoveCommand from "../../src/models/commands/move-command";
import GameReporter from "../../src/models/game-reporter";
import ToyRobot from "../../src/models/toy-robot";

jest.mock("../../src/models/commands/place-command");
jest.mock("../../src/models/commands/move-command");

describe("CommandProcessor", () => {
  let subject: () => any;
  let commandProcessor: CommandProcessor;
  let commands: string[];
  let mockExecute: (robot: ToyRobot) => void;

  describe("processCommands", () => {
    beforeEach(() => {
      mockExecute = jest.fn((robot: ToyRobot) => {});

      (PlaceCommand as jest.Mock).mockImplementation(() => {
        return {
          execute: mockExecute,
        };
      });
      (MoveCommand as jest.Mock).mockImplementation(() => {
        return {
          execute: mockExecute,
        };
      });

      subject = () => {
        commandProcessor = new CommandProcessor(
          new ToyRobot(DEFAULT_TABLE_SIZE),
          new GameReporter(() => {})
        );
        commands = ["PLACE 0,1,NORTH", "MOVE", "MOVE 123", "MOVE 123", "XXX"];
        commandProcessor.processCommands(commands);
      };
    });

    it("calls command.execute correctly", () => {
      subject();
      expect(mockExecute).toHaveBeenCalledTimes(2);
    });
  });
});

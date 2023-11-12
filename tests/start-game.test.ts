import * as mockStdin from "mock-stdin";
import { startGame } from "../src/start-game";
import { logger } from "../src/models/logger";
import CommandProcessor from "../src/models/command-processor";
import * as constants from "../src/constants";

jest.mock("../src/models/logger", () => ({
  logger: {},
}));

describe("startGame", () => {
  let mockedStdin: mockStdin.MockSTDIN;
  let subject: (commands: string[]) => void;
  let mockprocessCommands: jest.MockedFunction<any>;

  beforeEach(() => {
    logger.info = jest.fn();
    mockedStdin = mockStdin.stdin();
    subject = (commands) => {
      startGame();
      mockedStdin.send(commands.join("\n") + "\n");
    };
  });

  afterEach((done) => {
    mockedStdin.restore();
    done();
  });

  describe("without mocked processCommands function", () => {
    it("calls logger.info with correct output", () => {
      subject([
        "PLACE 0,0,NORTH",
        "MOVE",
        "LEFT",
        "RIGHT",
        "REPORT",
        "MOVE",
        "EXIT",
      ]);
      expect(logger.info).toHaveBeenCalledWith("Output: 0,1,NORTH");
    });

    describe("more complicated case", () => {
      it("calls logger.info with correct output", () => {
        subject([
          "PLACE 0,0,NORTH",
          "REPORT",
          "MOVE",
          "LEFT",
          "RIGHT",
          "REPORT",
          "MOVE",
          "LEFT",
          "LEFT",
          "REPORT",
          "MOVE",
          "MOVE",
          "REPORT",
          "RIGHT",
          "RIGHT",
          "MOVE",
          "MOVE",
          "MOVE",
          "MOVE",
          "MOVE",
          "MOVE",
          "MOVE",
          "REPORT",
          "RIGHT",
          "MOVE",
          "MOVE",
          "REPORT",
          "MOVE",
          "MOVE",
          "MOVE",
          "MOVE",
          "MOVE",
          "MOVE",
          "MOVE",
          "MOVE",
          "REPORT",
          "PLACE 0,0,EAST",
          "REPORT",
          "MOVE",
          "REPORT",
          "EXIT",
        ]);
        expect(logger.info).toHaveBeenCalledWith("Output: 0,0,NORTH");
        expect(logger.info).toHaveBeenCalledWith("Output: 0,1,NORTH");
        expect(logger.info).toHaveBeenCalledWith("Output: 0,2,SOUTH");
        expect(logger.info).toHaveBeenCalledWith("Output: 0,0,SOUTH");
        expect(logger.info).toHaveBeenCalledWith("Output: 0,4,NORTH");
        expect(logger.info).toHaveBeenCalledWith("Output: 2,4,EAST");
        expect(logger.info).toHaveBeenCalledWith("Output: 4,4,EAST");
        expect(logger.info).toHaveBeenCalledWith("Output: 0,0,EAST");
        expect(logger.info).toHaveBeenCalledWith("Output: 1,0,EAST");
      });
    });
  });

  describe("with mocked processCommands function", () => {
    beforeEach(() => {
      mockprocessCommands = jest.fn();
      jest
        .spyOn(CommandProcessor.prototype, "processCommands")
        .mockImplementation(mockprocessCommands);
    });

    describe("when commands length does not exceed batch limit", () => {
      beforeEach(() => {
        // @ts-ignore
        constants.COMMAND_BATCH_SIZE = 100;
      });

      it("executes commands correctly", () => {
        subject([
          "PLACE 0,0,NORTH",
          "MOVE",
          "LEFT",
          "RIGHT",
          "REPORT",
          "MOVE",
          "EXIT",
        ]);
        expect(mockprocessCommands).toHaveBeenCalledWith([
          "PLACE 0,0,NORTH",
          "MOVE",
          "LEFT",
          "RIGHT",
          "REPORT",
          "MOVE",
        ]);
        expect(logger.info).toHaveBeenCalledWith("Game ends");
      });

      describe("when last command is not 'EXIT'", () => {
        it("does not execute command", () => {
          subject(["PLACE 0,0,NORTH"]);
          expect(mockprocessCommands).not.toHaveBeenCalled();
          expect(logger.info).not.toHaveBeenCalled();
        });
      });
    });

    describe("when commands length exceeds batch limit", () => {
      beforeEach(() => {
        // @ts-ignore
        constants.COMMAND_BATCH_SIZE = 2;
      });

      it("executes commands correctly", () => {
        subject([
          "PLACE 0,0,NORTH",
          "MOVE",
          "LEFT",
          "RIGHT",
          "REPORT",
          "MOVE",
          "EXIT",
        ]);

        expect(mockprocessCommands).toHaveBeenCalledWith([
          "PLACE 0,0,NORTH",
          "MOVE",
        ]);
        expect(mockprocessCommands).toHaveBeenCalledWith(["LEFT", "RIGHT"]);
        expect(mockprocessCommands).toHaveBeenCalledWith(["REPORT", "MOVE"]);
        expect(logger.info).toHaveBeenCalledWith("Game ends");
      });
    });

    describe("when commands length exceeds total limit", () => {
      beforeEach(() => {
        // @ts-ignore
        constants.COMMAND_LIMIT = 2;
      });

      it("exits game earlier", () => {
        subject(["PLACE 0,0,NORTH", "MOVE", "LEFT"]);

        expect(logger.info).toHaveBeenCalledWith(
          "Too many commands, exiting game."
        );
      });
    });
  });
});

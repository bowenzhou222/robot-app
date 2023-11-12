import CommandParser from "../../src/models/command-parser";
import GameReporter from "../../src/models/game-reporter";
import PlaceCommand from "../../src/models/commands/place-command";
import MoveCommand from "../../src/models/commands/move-command";
import LeftCommand from "../../src/models/commands/left-command";
import RightCommand from "../../src/models/commands/right-command";
import ReportCommand from "../../src/models/commands/report-command";

describe("CommandParser", () => {
  let subject: () => any;
  let commandParser: CommandParser;
  let command: string;
  const gameReporter = new GameReporter(() => {});

  beforeEach(() => {
    commandParser = new CommandParser(gameReporter);
    subject = () => {
      return commandParser.parse(command);
    };
  });

  describe("when action is PLACE", () => {
    describe("when valid format", () => {
      beforeEach(() => {
        command = "PLACE 0,0,NORTH";
      });

      it("returns PlaceCommand", () => {
        expect(subject() instanceof PlaceCommand).toBe(true);
      });
    });

    describe("when X is not integer", () => {
      beforeEach(() => {
        command = "PLACE 0.1,0,NORTH";
      });

      it("returns null", () => {
        expect(subject()).toBe(null);
      });
    });

    describe("when Y is not integer", () => {
      beforeEach(() => {
        command = "PLACE 0,0.1,NORTH";
      });

      it("returns null", () => {
        expect(subject()).toBe(null);
      });
    });

    describe("when direction is not valid", () => {
      beforeEach(() => {
        command = "PLACE 0,0,XXX";
      });

      it("returns null", () => {
        expect(subject()).toBe(null);
      });
    });
  });

  describe("when action is MOVE", () => {
    describe("when valid format", () => {
      beforeEach(() => {
        command = "MOVE";
      });

      it("returns MoveCommand", () => {
        expect(subject() instanceof MoveCommand).toBe(true);
      });
    });

    describe("when invalid format", () => {
      beforeEach(() => {
        command = "MOVE XXX";
      });

      it("returns null", () => {
        expect(subject()).toBe(null);
      });
    });
  });

  describe("when action is LEFT", () => {
    describe("when valid format", () => {
      beforeEach(() => {
        command = "LEFT";
      });

      it("returns LeftCommand", () => {
        expect(subject() instanceof LeftCommand).toBe(true);
      });
    });

    describe("when invalid format", () => {
      beforeEach(() => {
        command = "LEFT XXX";
      });

      it("returns null", () => {
        expect(subject()).toBe(null);
      });
    });
  });

  describe("when action is RIGHT", () => {
    describe("when valid format", () => {
      beforeEach(() => {
        command = "RIGHT";
      });

      it("returns RightCommand", () => {
        expect(subject() instanceof RightCommand).toBe(true);
      });
    });

    describe("when invalid format", () => {
      beforeEach(() => {
        command = "RIGHT XXX";
      });

      it("returns null", () => {
        expect(subject()).toBe(null);
      });
    });
  });

  describe("when action is REPORT", () => {
    describe("when valid format", () => {
      beforeEach(() => {
        command = "REPORT";
      });

      it("returns ReportCommand", () => {
        expect(subject() instanceof ReportCommand).toBe(true);
      });
    });

    describe("when invalid format", () => {
      beforeEach(() => {
        command = "REPORT XXX";
      });

      it("returns null", () => {
        expect(subject()).toBe(null);
      });
    });
  });
});

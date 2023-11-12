import { startGame } from "../src/start-game";
import { initGameServer } from "../src/init-game-server";
import { logger } from "../src/models/logger";
import { main } from "../src/main";

jest.mock("../src/models/logger", () => ({
  logger: { info: jest.fn(), error: jest.fn() },
}));
jest.mock("../src/start-game");
jest.mock("../src/init-game-server");

describe("main", () => {
  let subject = () => {
    main();
  };

  describe("no error", () => {
    beforeEach(() => {
      (initGameServer as jest.Mock).mockImplementation(() => {});
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it("calls initGameServer correctly", () => {
      subject();
      expect(initGameServer).toHaveBeenCalled();
    });
    describe("when --readline is specified", () => {
      beforeEach(() => {
        process.argv.push("--readline");
      });

      afterEach(() => {
        process.argv.pop();
      });

      it("calls startGame correctly", () => {
        subject();
        expect(startGame).toHaveBeenCalled();
      });

      it("calls logger.info correctly", () => {
        subject();
        expect(logger.info).toHaveBeenCalled();
      });
    });
  });

  describe("when error", () => {
    let error: Error;

    beforeEach(() => {
      error = new Error("error!");
      (initGameServer as jest.Mock).mockImplementation(() => {
        throw error;
      });
    });

    it("logs error without displaying stack trace", () => {
      subject();
      expect(logger.error).toHaveBeenCalledWith(error);
    });
  });
});

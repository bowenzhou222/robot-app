import bodyParser from "body-parser";
import express, {
  NextFunction,
  Request,
  Response,
  ErrorRequestHandler,
} from "express";
import dotenv from "dotenv";
import { DEFAULT_TABLE_SIZE, REQUEST_BODY_SIZE_LIMIT } from "./constants";
import CommandProcessor from "./models/command-processor";
import ToyRobot from "./models/toy-robot";
import GameReporter from "./models/game-reporter";
import { logger } from "./models/logger";

export const initGameServer = () => {
  dotenv.config();

  const app = express();

  app.use(bodyParser.text({ limit: REQUEST_BODY_SIZE_LIMIT }));

  app.post("/robot", (req: Request, res: Response) => {
    const commands = (req.body || "").split("\n");
    const robot = new ToyRobot(DEFAULT_TABLE_SIZE);
    const gameReporter = new GameReporter((result: string) => {
      res.write(result + "\n");
    });
    const commandProcessor = new CommandProcessor(robot, gameReporter);
    commandProcessor.processCommands(commands);
    res.end();
    return;
  });

  app.use("*", (req, res, next) => {
    res.status(404);
    return res.json({
      message: "Not Found",
    });
  });

  const errorHandler: ErrorRequestHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    logger.info(err.message);
    return res.status(500).send("Internal Error");
  };

  app.use(errorHandler);

  return app;
};

import * as readline from "readline";
import ToyRobot from "./models/toy-robot";
import {
  DEFAULT_TABLE_SIZE,
  COMMAND_BATCH_SIZE,
  COMMAND_LIMIT,
} from "./constants";
import CommandProcessor from "./models/command-processor";
import { logger } from "./models/logger";
import GameReporter from "./models/game-reporter";

export const startGame = () => {
  const rl = readline.createInterface({
    input: process.stdin,
  });

  const robot = new ToyRobot(DEFAULT_TABLE_SIZE);
  const gameReporter = new GameReporter(logger.info);
  const commandProcessor = new CommandProcessor(robot, gameReporter);

  let commands: string[] = [];
  let totalCommandsCount = 0;

  rl.on("line", (line) => {
    totalCommandsCount += 1;
    if (line === "EXIT") {
      commandProcessor.processCommands(commands);
      rl.close();
    } else if (totalCommandsCount === COMMAND_LIMIT) {
      logger.info("Too many commands, exiting game.");
      rl.close()
    } else {
      commands.push(line);

      if (commands.length === COMMAND_BATCH_SIZE) {
        commandProcessor.processCommands(commands);
        commands = [];
      }
    }
  }).on("close", () => {
    logger.info("Game ends");
  });
};

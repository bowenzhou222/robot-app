import { initGameServer } from "./init-game-server";
import { logger } from "./models/logger";
import { startGame } from "./start-game";

export const main = () => {
  try {
    const lastArg = process.argv.slice(-1)[0];

    if (lastArg === "--readline") {
      logger.info("Game started. Please provide list of commands:");
      startGame();
    } else {
      const app = initGameServer();
      const port = process.env.PORT;
      app.listen(port, () => {
        logger.info("Game started.");
      });
    }
  } catch (error) {
    logger.error(error);
  }
};

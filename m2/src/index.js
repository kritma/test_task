import { handleTasks } from "./lib.js";
import { logger } from "./logger.js";

function taskHandler(task) {
    logger.info(`received task ${task}`);
    return { result: "done", task }
}

handleTasks(taskHandler)
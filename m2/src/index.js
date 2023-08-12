import { performCalcTask } from "./calc_task.js";
import { handleTasks } from "./lib.js";

async function taskHandler(task) {
    if (task.type == "calc_equation") {
        return performCalcTask(task)
    }
    return { error: { message: "no such task" } }
}

handleTasks(taskHandler)
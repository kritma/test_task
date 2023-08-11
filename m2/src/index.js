import { handleTasks } from "./lib.js";

function sleep(time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(), time)
    })
}

async function taskHandler(task) {
    if (task.task == "get_user") {
        await sleep(task.data.id * 100)
        return { id: task.data.id }
    }
    return { result: "done" }
}

handleTasks(taskHandler)
import nerdamer from "nerdamer";
import "nerdamer/all.js";

function solveForOneEquation(equation, variables = []) {
    const solution = {}
    for (const variable of variables) {
        nerdamer.set('SOLUTIONS_AS_OBJECT', false)
        solution[variable] = nerdamer.solve(equation, variable).toString().slice(1, -1).split(",")
    }
    return solution
}

function solveForManyEquations(equations, variables = []) {
    nerdamer.set('SOLUTIONS_AS_OBJECT', true)
    return nerdamer.solveEquations(equations, variables)
}

export function performCalcTask(task) {
    const equations = task.data.equations
    const variables = task.data.variables
    try {
        let solution;
        if (equations.length === 1) {
            solution = solveForOneEquation(equations[0], variables)
        } else {
            solution = solveForManyEquations(equations, variables)
        }
        return { result: solution }
    } catch (error) {
        return { error: { message: error.message } }
    }
}
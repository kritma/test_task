import express from 'express';
import { processTask } from './lib.js';

export const calc_api = express.Router()

calc_api.post("/", async (req, res, next) => {
    try {
        if (!Array.isArray(req.body.equations)) {
            res.status(400).json({ error: "equations field must be a array" })
            return
        }
        if (!req.body.equations.every(e => typeof e === 'string')) {
            res.status(400).json({ error: "equations field must be a array of strings" })
            return
        }

        if (!Array.isArray(req.body.variables)) {
            res.status(400).json({ error: "variables field must be a array" })
            return
        }
        if (!req.body.variables.every(e => typeof e === 'string')) {
            res.status(400).json({ error: "variables field must be a array of strings" })
            return
        }

        const task = { type: "calc_equation", data: { equations: req.body.equations, variables: req.body.variables } }

        res.json({ data: await processTask(task) })
    } catch (error) {
        next(error)
    }
})

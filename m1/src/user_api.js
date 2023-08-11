
import express from 'express';
import { processTask } from './lib.js';

export const users = express.Router()

users.get('/:id', async (req, res, next) => {
    try {
        const task = { task: "get_user", data: { id: req.params.id } }
        const data = await processTask(task)
        res.json({ data });
    } catch (error) {
        next(error)
    }
});

users.post('/', async (req, res, next) => {
    try {
        const task = { task: "add_user", data: req.body }
        const data = await processTask(task)
        res.json({ data });
    } catch (error) {
        next(error)
    }
});

users.delete('/', async (req, res, next) => {
    try {
        const task = { task: "delete_user", data: req.body }
        const data = await processTask(task)
        res.json({ data });
    } catch (error) {
        next(error)
    }
});

users.put('/', async (req, res, next) => {
    try {
        const task = { task: "update_user", data: req.body }
        const data = await processTask(task)
        res.json({ data });
    } catch (error) {
        next(error)
    }
});

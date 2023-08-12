import express, { json } from 'express';
import { logger } from './logger.js';
import { processTask } from './lib.js';

const PORT = process.env.PORT || 3000;

const app = express();
app.use(json());

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`);
  next()
});

app.post("/calc", async (req, res, next) => {
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

app.use((err, req, res, next) => {
  logger.error(err.message)
  res.status(500).send({ error: 'Internal server error' })
})


app.listen(PORT, () => {
  console.log(`M1 microservice is running on port ${PORT}`);
});

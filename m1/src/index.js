import express, { json } from 'express';
import { logger } from './logger.js';
import { calc_api } from './calc_api.js';

const PORT = process.env.PORT || 3000;

const app = express();
app.use(json());

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`);
  next()
});


app.use("/calc", calc_api)

app.use((err, req, res, next) => {
  logger.error(err.message)
  res.status(500).send({ error: 'Internal server error' })
})


app.listen(PORT, () => {
  console.log(`M1 microservice is running on port ${PORT}`);
});

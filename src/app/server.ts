import 'reflect-metadata';
import express from 'express';
import { requestRoutes } from '../interfaces/routes/RequestRoutes';

const app = express();
app.use(express.json());
app.use(requestRoutes);

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Сервер пашет на порту ${PORT}`);
});

export { app, server };

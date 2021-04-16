import express from 'express';
import { serverPort } from './configs';
import routes from './routes';
import { NotFoundMiddleware, ErrorMiddleware } from './middlewares';

const app = express();

app.use(express.json());

// Routes 
app.use('/api', routes);

// Middlewares
app.use(NotFoundMiddleware);
app.use(ErrorMiddleware);

// Start server
app.listen(serverPort, () => {
    console.log(`Listening on port ${serverPort}`);
});
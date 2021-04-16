import express from 'express';
import { serverPort } from './configs';
import { NotFoundMiddleware, ErrorMiddleware } from './middlewares';

const app = express();

app.use(express.json());

app.get('/', (req, res, nex) => {
    res.send('Server running...');
});

app.use(NotFoundMiddleware);
app.use(ErrorMiddleware);

// Start server
app.listen(serverPort, () => {
    console.log(`Listening on port ${serverPort}`);
});
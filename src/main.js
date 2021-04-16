import express from 'express';
import { serverPort } from './configs';

const app = express();

app.use(express.json());

app.get('/', (req, res, nex) => {
    res.send('Server running...');
});

// Start server
app.listen(serverPort, () => {
    console.log(`Listening on port ${serverPort}`);
});
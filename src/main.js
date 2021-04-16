import express from 'express';
import { DB_URI, serverPort } from './configs';
import routes from './routes';
import { connect as DBconnect, connection as DB } from 'mongoose';
import { NotFoundMiddleware, ErrorMiddleware } from './middlewares';

const app = express();

app.use(express.json());

// Routes 
app.use('/api', routes);

// Middlewares
app.use(NotFoundMiddleware);
app.use(ErrorMiddleware);

// Database connection
DBconnect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

DB.once('open', () => {
    console.log(`Connected to database: ${DB.name}`);

    // Start server
    app.listen(serverPort, () => {
        console.log(`Listening on port ${serverPort}`);
    });
});
DB.on('error', (err) => console.log(err));
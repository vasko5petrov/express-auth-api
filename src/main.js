import { PORT, REDIS_OPTIONS, DB_URI, DB_OPTIONS } from './configs';
import session from 'express-session';
import connectRedis from 'connect-redis';
import Redis from 'ioredis';
import { connect, connection as DB } from 'mongoose';
import createApp from './app';

// Database connection
connect(DB_URI, DB_OPTIONS);

DB.once('open', () => {
    console.log(`Connected to database: ${DB.name}`);

    const RedisStore = connectRedis(session);
    const client = new Redis(REDIS_OPTIONS);
    const store = new RedisStore({ client });
    
    const app = createApp(store);

    // Start server
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });
});
DB.on('error', (err) => console.log(err));
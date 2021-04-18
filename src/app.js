import express from 'express';
import routes from './routes';
import { NotFoundMiddleware, ErrorMiddleware } from './middlewares';
import session from 'express-session';
import { SESSION_OPTIONS } from './configs';

export default (store) => {
    const app = express();

    app.use(express.json());

    // Session
    app.use(
        session({
            ...SESSION_OPTIONS, 
            store
        })
    );

    // Routes 
    app.use('/api', routes);

    // Middlewares
    app.use(NotFoundMiddleware);
    app.use(ErrorMiddleware);

    return app;
}
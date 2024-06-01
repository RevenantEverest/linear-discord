import type { Application } from 'express';
import type { Request } from '@@types/express';

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import { authRoutes, linearRoutes } from '@@routes/index.js';

function initializeApp(): Application {
    const app = express();

    app.use(morgan("dev"));

    /* https://developers.linear.app/docs/graphql/webhooks */
    app.use(express.json({
        verify: (req: Request, res, buf) => {
            req.rawBody = buf;
        }
    }));

    app.use(express.urlencoded({ extended: false }));
    app.use(cors());
    app.set("trust proxy", true);
    app.set("trust proxy", "loopback");

    app.use("/auth", authRoutes);
    app.use("/linear", linearRoutes);

    return app;
};

export default initializeApp;
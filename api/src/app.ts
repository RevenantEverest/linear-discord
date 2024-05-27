import type { Application } from 'express';

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

function initializeApp(): Application {
    const app = express();

    app.use(morgan("dev"));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cors());
    app.set("trust proxy", true);
    app.set("trust proxy", "loopback");

    return app;
};

export default initializeApp;
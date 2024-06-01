import express from 'express';
import { authControllers } from '@@controllers/index.js';

const router = express.Router();

router.route("/")
.post(authControllers.login);

export default router;
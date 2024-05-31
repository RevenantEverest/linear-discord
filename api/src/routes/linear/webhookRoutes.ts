import express from 'express';
import { linearController } from '@@controllers/index.js';

const router = express.Router();

router.route("/")
.post(linearController.webhook)

export default router;
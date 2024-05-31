import express from 'express';
import webhookRoutes from './webhookRoutes.js';

const router = express.Router();

router.use("/webhook", webhookRoutes);

export default router;
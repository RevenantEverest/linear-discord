import express from 'express';
import { linearController, linearWebhooksController } from '@@controllers/index.js';

import { extractPaginationParams, validation, verifyToken } from '@@middleware/index.js';

const router = express.Router();

/* Authenticated Route */
router.route("/")
.get(verifyToken, extractPaginationParams, linearWebhooksController.index)
.post(verifyToken, linearWebhooksController.create)

/* Authenticated Route */
router.route("/id/:id")
.get(verifyToken, validation.id, linearWebhooksController.getOne)
.delete(verifyToken, validation.id, linearWebhooksController.destroy)

/* Authenticated Route */
router.route("/guildId/:guildId")
.get(verifyToken, extractPaginationParams, validation.guildId, linearWebhooksController.getByGuildId)

/* Authenticated Route */
router.route("/guildId/:guildId/id/:id")
.put(verifyToken, [validation.guildId, validation.id], linearWebhooksController.update);

/* Webhook route given to Linear */
router.route("/guildId/:guildId/channelId/:channelId")
.post([validation.guildId, validation.channelId], linearController.webhook)

export default router;
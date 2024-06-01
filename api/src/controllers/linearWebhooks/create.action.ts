import type { Request, Response } from '@@types/express.js';

import { z } from 'zod';
import { LinearWebhook } from '@@entities/index.js';
import { linearWebhookSchemas } from '@@schemas/index.js';

import { entities, errors } from '@@utils/index.js';

type Body = z.infer<typeof linearWebhookSchemas.create>;

async function create(req: Request<Body>, res: Response<"auth">) {

    const validatedBody = linearWebhookSchemas.create.safeParse(req.body);

    if(!validatedBody.success) {
        return errors.sendInvalidBody<Body>(res, validatedBody.error);
    }

    const [linearWebhook, err] = await entities.insert<LinearWebhook>(LinearWebhook, {
        guildId: req.body.guildId,
        channelId: req.body.channelId,
        signatureSecret: req.body.signatureSecret
    });

    if(err || !linearWebhook) {
        return errors.sendEntitiesResponse({
            res,
            err,
            message: "Error creating Linear Webhook",
            entity: linearWebhook,
            missingEntityMessage: "Unable to create Linear Webhook"
        });
    }

    return res.json({ results: linearWebhook });
};

export default create;
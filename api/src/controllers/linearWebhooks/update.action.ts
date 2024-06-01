import type { Request, Response } from '@@types/express.js';

import { z } from 'zod';
import { LinearWebhook } from '@@entities/index.js';
import { linearWebhookSchemas } from '@@schemas/index.js';

import { entities, errors } from '@@utils/index.js';

interface Params {
    guildId: string,
    id: number
};

type Body = z.infer<typeof linearWebhookSchemas.update>;

async function update(req: Request<Body>, res: Response<["params", "auth"], Params>) {
    
    const { guildId, id } = res.locals.params;

    const validatedBody = linearWebhookSchemas.update.safeParse(req.body);

    if(!validatedBody.success) {
        return errors.sendInvalidBody<Body>(res, validatedBody.error);
    }

    const [findRes, findErr] = await entities.findOne<LinearWebhook>(LinearWebhook, {
        where: {
            guildId,
            id
        }
    });

    if(findErr || !findRes) {
        return errors.sendEntitiesResponse({
            res,
            err: findErr,
            message: "Error finding Linear Webhook",
            entity: findRes,
            missingEntityMessage: "Unable to find Linear Webhook"
        });
    }

    const [updatedLinearWebhook, updateErr] = await entities.update(LinearWebhook, {
        ...findRes,
        label: req.body.label,
        channelId: req.body.channelId,
        signatureSecret: req.body.signatureSecret
    });

    if(updateErr || updatedLinearWebhook) {
        return errors.sendEntitiesResponse({
            res,
            err: updateErr,
            message: "Error updating Linear Webhook",
            entity: updatedLinearWebhook,
            missingEntityMessage: "Unable to update Linear Webhook"
        });
    }

    return res.json({ results: updatedLinearWebhook });
};

export default update;
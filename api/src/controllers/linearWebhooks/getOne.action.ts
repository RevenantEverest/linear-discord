import type { Request, Response } from '@@types/express.js';

import { LinearWebhook } from '@@entities/index.js';
import { entities, errors } from '@@utils/index.js';

interface Params {
    id: number
};

async function getOne(req: Request, res: Response<["params", "auth"], Params>) {

    const { id } = res.locals.params;

    const [linearWebhook, err] = await entities.findOne<LinearWebhook>(LinearWebhook, {
        where: {
            id
        }
    });

    if(err || !linearWebhook) {
        return errors.sendEntitiesResponse({
            res,
            err,
            message: "Error finding Linear Webhook",
            entity: linearWebhook,
            missingEntityMessage: "Unable to find Linear Webhook"
        });
    }

    return res.json({ results: linearWebhook });
};

export default getOne;
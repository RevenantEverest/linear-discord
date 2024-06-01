import type { Request, Response } from '@@types/express.js';

import { LinearWebhook } from '@@entities/index.js';
import { entities, errors } from '@@utils/index.js';

interface Params {
    id: number
};

async function destroy(req: Request, res: Response<["params", "auth"], Params>) {

    const { id } = res.locals.params;

    const [linearWebhook, findErr] = await entities.findOne<LinearWebhook>(LinearWebhook, {
        where: {
            id
        }
    });

    if(findErr || !linearWebhook) {
        return errors.sendEntitiesResponse({
            res,
            err: findErr,
            message: "Error deleting Linear Webhook",
            entity: linearWebhook,
            missingEntityMessage: "Unable to delete Linear Webhook"
        });
    }

    const [deletedLinearWebhook, deleteErr] = await entities.destroy<LinearWebhook>(LinearWebhook, linearWebhook);

    if(deleteErr || !deletedLinearWebhook) {
        return errors.sendEntitiesResponse({
            res,
            err: deleteErr,
            message: "Error deleting Linear Webhook",
            entity: deletedLinearWebhook,
            missingEntityMessage: "Unable to delete Linear Webhook"
        });
    }

    return res.json({ results: deletedLinearWebhook })
};

export default destroy;
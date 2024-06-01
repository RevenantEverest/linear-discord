import type { Request, Response } from '@@types/express.js';

import { LinearWebhook } from '@@entities/index.js';
import { entities, errors, pagination } from '@@utils/index.js';

async function index(req: Request, res: Response<["pagination", "auth"]>) {

    const { limit, offset } = res.locals.pagination;

    const [linearWebhooks, err] = await entities.indexAndCount<LinearWebhook>(LinearWebhook, {
        limit, offset
    });

    if(err || !linearWebhooks) {
        return errors.sendEntitiesResponse({
            res,
            err,
            message: "Error indexing Linear Webhooks",
            entity: linearWebhooks,
            missingEntityMessage: "Unable to index Linear Webhooks"
        });
    }

    const paginatedResponse = pagination.paginateResponse<LinearWebhook>(req, res, linearWebhooks);

    return res.json(paginatedResponse);
};

export default index;
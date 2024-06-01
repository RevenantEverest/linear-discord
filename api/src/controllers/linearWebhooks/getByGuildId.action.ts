import type { Request, Response } from '@@types/express.js';
import type { FindOneOptions } from 'typeorm';

import { LinearWebhook } from '@@entities/index.js';
import { entities, errors, pagination } from '@@utils/index.js';

interface Params {
    guildId: string
};

async function getByGuildId(req: Request, res: Response<["params", "pagination", "auth"], Params>) {

    const { guildId } = res.locals.params;
    const { limit, offset } = res.locals.pagination;

    const findOptions: FindOneOptions<LinearWebhook> = {
        where: {
            guildId
        }
    };

    const [linearWebhooks, err] = await entities.findAndCount<LinearWebhook>(LinearWebhook, findOptions, {
        limit, offset
    });

    if(err || !linearWebhooks) {
        return errors.sendEntitiesResponse({
            res,
            err,
            message: "Error finding Linear Webhooks",
            entity: linearWebhooks,
            missingEntityMessage: "Unable to find Linear Webhooks"
        });
    }

    const paginatedResponse = pagination.paginateResponse<LinearWebhook>(req, res, linearWebhooks);

    return res.json(paginatedResponse);
};

export default getByGuildId;
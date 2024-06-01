import { Request, Response, NextFunction } from '@@types/express.js';

import { errors, discord } from '@@utils/index.js';

async function channelId(req: Request<unknown, { [key: string]: string }>, res: Response, next: NextFunction) {
    const guildId: string = req.params.guildId;
    const isValidId: boolean = discord.isValidId(guildId);

    if(!res.locals.params) {
        res.locals.params = {};
    }

    if(!isValidId) {
        return errors.sendResponse({ res, status: 400, message: "Invalid ID Parameter" });
    }
    
    res.locals.params["channelId"] = guildId;
    next();
};

export default channelId;
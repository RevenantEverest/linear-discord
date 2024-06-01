import { Request, Response, NextFunction } from '@@types/express.js';

import { AuthPayload } from '@@types/auth.js';

import { errors, discord } from '@@utils/index.js';

interface Body {
    guildId?: string
};

async function isGuildMember(req: Request<Body>, res: Response, next: NextFunction) {
    const { discordId }: AuthPayload = res.locals.auth;
    const guildId: string = res.locals.params ? res.locals.params.guildId : req.body.guildId;

    const [isMember, err] = await discord.isGuildMember({ guildId, discordId });

    if(err) {
        errors.sendResponse({ res, next, err: err, message: err.message });
    }

    if(!isMember) {
        return errors.sendResponse({ res, status: 403, message: "Forbidden" });
    }

    next();
};

export default isGuildMember;
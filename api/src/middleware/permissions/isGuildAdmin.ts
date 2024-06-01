import type { Request, Response, NextFunction } from '@@types/express.js';
import { PermissionFlagsBits } from 'discord.js';

import { errors, discord } from '@@utils/index.js';

interface Body {
    guildId?: string
};

async function isGuildAdmin(req: Request<Body>, res: Response, next: NextFunction) {

    const guildId: string = res.locals.params ? res.locals.params.guildId : req.body.guildId;

    const [hasPermission, hasPermissionErr] = await discord.checkMemberPermissions({
        guildId: guildId,
        discordId: res.locals.auth.discord_id,
        permission: PermissionFlagsBits.Administrator
    });

    if(hasPermissionErr) {
        return errors.sendResponse({ res, status: 500, err: hasPermissionErr, message: hasPermissionErr.message });
    }

    if(!hasPermission) {
        return errors.sendResponse({ res, status: 403, message: "You're missing permissions" });
    }

    next();
};

export default isGuildAdmin;
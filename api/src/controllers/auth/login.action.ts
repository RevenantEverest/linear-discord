import type { Request, Response } from '@@types/express.js';
import type { AuthPayload } from '@@types/auth.js';
import type { DiscordTokenResponse, DiscordUser } from '@@types/discord.js';

import type { AxiosResponse } from 'axios';
import type { FindOneOptions } from 'typeorm';

import { User, DiscordToken } from '@@entities/index.js';
import { discordServices } from '@@services/index.js';
import { issueToken } from '@@middleware/index.js';

import { ENV } from '@@constants/index.js';
import { promises, entities, errors } from '@@utils/index.js';

interface Body {
    code: string
};

async function login(req: Request<Body>, res: Response) {

    const { code } = req.body;

    /* Get Auth Token */
    const tokenPromise = discordServices.getToken(code, ENV.DISCORD.REDIRECT_URI);
    const [token, tokenErr] = await promises.handle<AxiosResponse<DiscordTokenResponse>>(tokenPromise);

    if(tokenErr) return errors.sendResponse({ res, err: tokenErr, message: "Token Promise Error" });
    if(!token) return errors.sendResponse({ res, message: "No Token Response" });

    /* Get Discord User with Auth Token */
    const discordUserPromise = discordServices.getUserInfo(token.data.access_token);
    const [discordUser, discordUserErr] = await promises.handle<AxiosResponse<DiscordUser>>(discordUserPromise);

    if(discordUserErr) return errors.sendResponse({ res, err: discordUserErr, message: "Discord User Promise Error" });
    if(!discordUser) return errors.sendResponse({ res, message: "No Discord User Response" });

    /* Grab Discord Token from DB */
    const discordTokenConditional: FindOneOptions<DiscordToken> = {
        where: {
            discordId: discordUser.data.id
        }
    };
    const [discordToken, discordTokenErr] = await entities.findAndSaveOrUpdate<DiscordToken>(DiscordToken, discordTokenConditional, {
        discordId: discordUser.data.id,
        accessToken: token.data.access_token,
        refreshToken: token.data.refresh_token,
        expiresIn: token.data.expires_in
    });

    if(discordTokenErr) return errors.sendResponse({ res, err: discordTokenErr, message: "Discord Token DB Error" });
    if(!discordToken) return errors.sendResponse({ res, message: "No Discord Token Response" });

    const userConditional: FindOneOptions<User> = {
        where: {
            discordId: discordUser.data.id
        }
    };
    const [user, userErr] = await entities.findOrSave<User>(User, userConditional, {
        discordId: discordUser.data.id,
        email: discordUser.data.email
    });

    if(userErr) return errors.sendResponse({ res, err: userErr, message: "User DB Error" });
    if(!user) return errors.sendResponse({ res, message: "No User Response" });

    const payload: AuthPayload = {
        id: user.id,
        email: discordUser.data.email,
        discordId: discordUser.data.id,
        username: discordUser.data.username,
        displayName: discordUser.data.global_name,
        avatar: discordUser.data.avatar
    };

    return issueToken(res, payload);
};

export default login;
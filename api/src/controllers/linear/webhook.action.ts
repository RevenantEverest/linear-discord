import type { Request, Response } from '@@types/express.js';
import type { LinearPayload } from '@@types/linear/linearPayload.js';

import Discord from 'discord.js';

import bot from '@@root/discordBot.js';
import { LinearWebhook } from '@@entities/index.js';
import { 
    issueCreate, 
    issueRemove, 
    issueRestore, 
    issueUpdate
} from './operations/index.js';

import { linear, dates, entities, errors } from '@@utils/index.js';

interface Params {
    guildId: string,
    channelId: string
};

async function webhook(req: Request<LinearPayload>, res: Response<"params", Params>) {

    if(!req.rawBody) {
        return res.sendStatus(400);
    }

    const { guildId, channelId } = res.locals.params;

    const [linearWebhook, err] = await entities.findOne<LinearWebhook>(LinearWebhook, {
        where: {
            guildId,
            channelId
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

    // Verify Signature
    const isVerified = linear.verifySignature(req.rawBody, linearWebhook.signatureSecret, req.headers['linear-signature']);

    if(!isVerified) {
        return res.sendStatus(400);
    }

    // Allow linear to terminate webhook post signature verification
    res.sendStatus(200);
    
    const payload = req.body;
    const webhookDate = dates.format(new Date(payload.webhookTimestamp));

    /*
        Prevents updates for:
        - description
        - assignee's
    */
    if(!payload.updatedFrom || payload.updatedFrom.description || payload.updatedFrom.assigneeId) {
        return;
    }

    // Common embed elements
    let embed = new Discord.EmbedBuilder({
        thumbnail: {
            url: "https://i.imgur.com/hnL8LTj.png"
        },
        footer: {
            text: `${webhookDate.date} at ${webhookDate.time} EST`,
            icon_url: "https://i.imgur.com/hnL8LTj.png"
        }
    });

    if(linear.isIssue(payload.data)) {
        switch(req.body.action) {
            case "create":
                embed = issueCreate(embed, payload.data);
                break;
            case "update":
                embed = issueUpdate(embed, payload.data, payload.actor, payload.updatedFrom);
                break;
            case "remove":
                embed = issueRemove(embed, payload.data);
                break;
            case "restore":
                embed = issueRestore(embed, payload.data);
        }
    }

    const channel = await bot.channels.fetch(linearWebhook.channelId);

    if(embed && channel && channel.isTextBased()) {
        return channel.send({ embeds: [embed] });
    }
};

export default webhook;
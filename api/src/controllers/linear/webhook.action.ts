import type { Request, Response } from '@@types/express.js';
import type { LinearPayload } from '@@types/linear/linearPayload.js';

import Discord from 'discord.js';

import bot from '@@root/discordBot.js';
import { 
    issueCreate, 
    issueRemove, 
    issueRestore, 
    issueUpdate
} from './operations/index.js';

import { linear, dates } from '@@utils/index.js';

async function webhook(req: Request<LinearPayload>, res: Response) {

    if(!req.rawBody) {
        return res.sendStatus(400);
    }

    // Verify Signature
    const WEBHOOK_SECRET = "lin_wh_Czs0ask03FbQfN124ZwkA1RHQdNQU42DDSvnMDcv4oUo";
    const isVerified = linear.verifySignature(req.rawBody, WEBHOOK_SECRET, req.headers['linear-signature']);

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
                embed = issueCreate(embed, payload.data, payload.actor);
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

    const guildId = "427883469092159490";
    const channelId = "427883469092159492";

    const channel = await bot.channels.fetch(channelId);

    if(embed && channel && channel.isTextBased()) {
        return channel.send({ embeds: [embed] });
    }
};

export default webhook;
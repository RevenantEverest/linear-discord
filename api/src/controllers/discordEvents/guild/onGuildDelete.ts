import type { Client, Guild } from 'discord.js';

import { BotGuild } from '@@entities/index.js';
import { logs, colors, entities } from '@@utils/index.js';

async function onGuildDelete(bot: Client, guild: Guild) {

    const [botGuild, findErr] = await entities.findOne<BotGuild>(BotGuild, {
        where: {
            guildId: guild.id
        }
    });

    if(findErr || !botGuild) {
        return logs.error({
            color: colors.error,
            type: "REMOVE GUILD ERROR",
            message: findErr ? findErr.message : "Unable to find Bot Guild",
            err: findErr
        });
    }

    const [updatedBotGuild, updateErr] = await entities.update<BotGuild>(BotGuild, {
        ...botGuild,
        isRemoved: true
    });

    if(updateErr || !updatedBotGuild) {
        return logs.error({
            color: colors.error,
            type: "REMOVE GUILD ERROR",
            message: updateErr ? updateErr.message : "Unable to update Bot Guild",
            err: updateErr
        });
    }

    return logs.log({ color: colors.warning, type: "REMOVE GUILD", message: `${guild.name} - ${guild.id}` });
};

export default onGuildDelete;
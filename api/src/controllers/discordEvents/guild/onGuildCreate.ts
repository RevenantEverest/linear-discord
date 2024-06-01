import type { Client, Guild } from 'discord.js';
import type { FindOneOptions } from 'typeorm';

import { BotGuild } from '@@entities/index.js';
import { logs, colors, entities } from '@@utils/index.js';

async function onGuildCreate(bot: Client, guild: Guild) {
    logs.log({ color: colors.warning, message: "Creating guild..." });

    const findOptions: FindOneOptions<BotGuild> = {
        where: {
            guildId: guild.id
        }
    };

    const [botGuild, err] = await entities.findAndSaveOrUpdate<BotGuild>(BotGuild, findOptions, {
        guildId: guild.id
    });

    if(err || !botGuild) {
        return logs.error({ 
            color: colors.error, 
            type: "NEW GUILD ERROR", 
            message: err ? err.message : "No Bot Guild Returned", 
            err
        });
    }

    return logs.log({ color: colors.success, type: "NEW GUILD", message: `${guild.name} - ${guild.id}` });
};

export default onGuildCreate;
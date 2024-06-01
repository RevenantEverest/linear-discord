import type { Client, Guild } from 'discord.js';

import { logs, colors } from '@@utils/index.js';

async function onGuildUpdate(bot: Client, guild: Guild) {

    return logs.log({ color: colors.warning, type: "UPDATE GUILD", message: `${guild.name} - ${guild.id}` });
};

export default onGuildUpdate;
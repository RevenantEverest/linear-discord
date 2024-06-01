import Discord, { ClientOptions, Guild, Interaction } from 'discord.js';

import { discordEventsController } from './controllers/index.js';

const options: ClientOptions = {
    intents: [
        "Guilds", 
        "GuildMembers", 
        "GuildEmojisAndStickers",
        "GuildMessageReactions",
    ]
};
const bot = new Discord.Client(options);

bot.on("ready", async () => discordEventsController.onReady(bot));
bot.on("interactionCreate", async (interaction: Interaction) => discordEventsController.onInteractionCreate(bot, interaction));
bot.on("error", async (err: Error) => discordEventsController.onError(bot, err));

/* Guild Events */
bot.on("guildCreate", async (guild: Guild) => discordEventsController.onGuildCreate(bot, guild));
bot.on("guildUpdate", async (guild: Guild) => discordEventsController.onGuildUpdate(bot, guild));
bot.on("guildDelete", async (guild: Guild) => discordEventsController.onGuildDelete(bot, guild));

export default bot;
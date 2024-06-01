import type { Client, Interaction } from 'discord.js';

function onInteractionCreate(bot: Client, interaction: Interaction) {
    console.log("Bot =>", bot);
    console.log("Interaction =>", interaction);
};

export default onInteractionCreate;
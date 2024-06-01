import type { TextChannel, Channel } from 'discord.js';
import type { LogOptions, ErrorLogOptions, PostToLogsChannelOptions } from '@@types/logs.js';

import Discord from 'discord.js';
import chalk from 'chalk';

import { LOG_CHANNELS } from '@@constants/index.js';

import * as colors from './colors.js';
import * as promises from './promises.js';
import * as dates from './dates.js';

export async function log({ color, type="LOG", message="" }: LogOptions) {
    const logType = "[" + type + "]";
    return console.log(chalk.hex(color.toString())(logType) + " " + message);
};

export async function error({ color=colors.error, type="ERROR", message="", err }: ErrorLogOptions) {
    const logType = "[" + type + "]";
    return console.error(chalk.hex(color.toString())(logType) + " " + message, err);
};

export async function postToLogsChannel({ bot, color, title, channelId=LOG_CHANNELS.LOGS }: PostToLogsChannelOptions) {
    const { date, time } = await dates.getTimestampAndFormat();
    const [logChannel, logChannelErr] = await promises.handle<Channel | null>(bot.channels.fetch(channelId));

    if(logChannelErr) {
        return error({ err: logChannelErr, message: "Error Fetching Log Channel" });
    }

    if(!logChannel) {
        return error({ message: "No Log Channel" });
    }

    const embed = new Discord.EmbedBuilder({ 
        color: color, 
        title: title, 
        footer: { text: `${date} at ${time}` } 
    });

    return (logChannel as TextChannel).send({ embeds: [embed] });
};
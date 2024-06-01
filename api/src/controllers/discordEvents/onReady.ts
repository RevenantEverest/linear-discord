import type { Client } from 'discord.js';

import { ENV } from '@@constants/index.js';
import { logs, colors } from '@@utils/index.js';

function onReady(bot: Client) {

    if(ENV.IS_DEV) {
        return logs.log({ color: colors.success, message: "Discord Application ready" });
    }

    logs.postToLogsChannel({ bot, color: colors.success, title: "Application Ready" });
};

export default onReady;
import "reflect-metadata";

import AppDataSource from '@@db/dataSource.js';
import waitForPostgres from '@@db/waitForPostgres.js';
import initializeApp from './app.js';
import bot from './discordBot.js';

import { ENV } from '@@constants/index.js';
import { logs, colors, promises } from '@@utils/index.js';

(async function main() {
    await waitForPostgres(AppDataSource);

    bot.login(ENV.DISCORD.KEY);

    await promises.waitFor(() => bot.isReady(), {
        retries: 10,
        intervalLength: 2000
    });

    const PORT = ENV.API_PORT || 3001;
    const app = initializeApp();

    app.listen(PORT, () => {
        return logs.log({ 
            color: colors.success, 
            type: "HTTP", 
            message: `Linear Discord: Listening on port ${PORT}` 
        })
    });
})();
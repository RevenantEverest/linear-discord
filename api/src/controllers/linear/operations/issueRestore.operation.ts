import type { EmbedBuilder } from 'discord.js';
import type { LinearIssue } from '@@types/linear/linearIssue.js';

import { colors } from '@@utils/index.js';

function issueRestore(embed: EmbedBuilder, issue: LinearIssue): EmbedBuilder {

    embed
    .setColor(colors.linearRestore)
    .setAuthor({ name: "Issue Restored" })
    .setTitle(`${issue.team.key}-${issue.number} ${issue.title}`)

    return embed;
};

export default issueRestore;
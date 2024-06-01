import type { LinearIssue } from '@@types/linear/linearIssue.js';
import type { EmbedBuilder } from 'discord.js';

import { colors } from '@@utils/index.js';

function issueRemove(embed: EmbedBuilder, issue: LinearIssue): EmbedBuilder {

    embed
    .setColor(colors.error)
    .setAuthor({ name: "" })
    .setTitle(`**${issue.team.key}-${issue.number}** ${issue.title}`)

    return embed;
};

export default issueRemove;
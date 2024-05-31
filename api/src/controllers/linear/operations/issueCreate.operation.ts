import type { LinearIssue } from '@@types/linear/linearIssue.js';
import type { LinearPayloadActor } from '@@types/linear/linearPayload.js';
import type { EmbedBuilder } from 'discord.js';

import { colors } from '@@utils/index.js';

function issueCreate(embed: EmbedBuilder, issue: LinearIssue, actor: LinearPayloadActor): EmbedBuilder {

    embed
    .setColor(colors.linear)
    .setAuthor({ name: "Issue Created" })
    .setTitle(`**${issue.team.key}-${issue.number}** ${issue.title}`)
    .setDescription(`${issue.description ?? ""}`)
    .addFields({ name: "Status", value: issue.state.name, inline: true })

    if(issue.priority > 0) {
        embed.addFields({ name: "Priority", value: issue.priorityLabel, inline: true });
    }

    if(issue.project) {
        embed.addFields({ name: "Project", value: issue.project.name, inline: true });
    }

    if(issue.team) {
        embed.addFields({ name: "Team", value: issue.team.name, inline: true });
    }

    if(issue.labels) {
        const labelNames = issue.labels.map((label) => label.name).join(", ");
        embed.addFields({ name: "Labels", value: labelNames });
    }

    return embed;
};

export default issueCreate;
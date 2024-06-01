import type { LinearIssue } from '@@types/linear/linearIssue.js';
import type { LinearPayloadActor, LinearPayloadUpdatedFrom, LinearPriority, } from '@@types/linear/linearPayload.js';
import type { ColorResolvable, EmbedBuilder } from 'discord.js';

import { LINEAR } from '@@constants/index.js';
import { colors } from '@@utils/index.js';

/**
 * Handles creating an embed for updated Linear issues. Only checks for status or priority changes.
 * @param issue 
 * @param actor 
 */
function issueUpdate(embed: EmbedBuilder, issue: LinearIssue, actor: LinearPayloadActor, updatedFrom: LinearPayloadUpdatedFrom): EmbedBuilder {

    const issueIdentifier = `${issue.team.key}-${issue.number} ${issue.title}`;

    let color: ColorResolvable = colors.warning;
    let title = `**${actor.name}**`;
    let authorName = "Issue Updated";

    if(updatedFrom.priority) {
        authorName = "Issue Priority Changed";
        title += ` changed issue priority to ${LINEAR.PRIORITY_LABELS[issue.priority.toString() as keyof LinearPriority]}`;
    }

    if(updatedFrom.stateId) {
        color = colors.hexColorToHexValue(issue.state.color);
        authorName = "Issue Status Changed";
        title += ` changed issue status to **${issue.state.name}**`
    }

    title += ` for **${issueIdentifier}**`;

    embed
    .setColor(color)
    .setAuthor({ name: authorName })
    .setTitle(title)

    return embed;
};

export default issueUpdate;
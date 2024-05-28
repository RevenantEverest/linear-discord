import type { LinearComment } from './linearComment.js';
import type { LinearIssue } from './linearIssue.js';

/**
 * Linear webhook payload action
 *
 * `create` | 
 */
export type LinearPayloadAction = "create" | "update" | "remove" | "restore";

/**
 * Linear webhook payload type
 *
 * `Issue` | `Comment`
 */
export type LinearPayloadType = "Issue" | "Comment";

/**
 * Linear webhook payload actor object shape
 */
export interface LinearPayloadActor {
    id: string,
    name: string,
    type: string
};

export interface LinearPayloadUpdatedFrom {
    description?: string,
    descriptionData?: string,
    title?: string,
    labelIds?: string[],
    priority?: number,
    sortOrder?: number,
    stateId?: string,
    startedAt?: null | string,
    assigneeId?: null | string,
    updatedAt: string
};

/**
 * Linear webhook payload shape
 */
export interface LinearPayload {
    action: LinearPayloadAction,
    actor: LinearPayloadActor,
    createdAt: string,
    data: LinearIssue | LinearComment, // Issue or Comment
    updatedFrom?: LinearPayloadUpdatedFrom,
    url: string,
    type: LinearPayloadType,
    organizationId: string,
    webhookTimestamp: string,
    webhookId: string
};

/**
 * Linear Priority title object
 */
export interface LinearPriority {
    "0": "No Priority",
    "1": "Urgent",
    "2": "High",
    "3": "Medium",
    "4": "Low"
};

export type { LinearIssue, LinearIssueState, LinearIssueTeam } from './linearIssue.js';
export type { LinearComment, LinearCommentReactionData, LinearCommentReactions } from './linearComment.js';
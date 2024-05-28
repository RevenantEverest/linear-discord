/**
 * Linear webhook comment payload reactions shape
 */
export interface LinearCommentReactions {
    id: string,
    userId: string,
    reactedAt: string
};

/**
 * Linear webhook comment payload reaction data
 */
export interface LinearCommentReactionData {
    emoji: string,
    reactions: LinearCommentReactions[]
};

/**
 * Linear webhook **comment** payload. 
 * 
 * Appears as the `data` key of a `LinearPayload`
 */
export interface LinearComment {
    id: string,
    createdAt: string,
    updatedAt: string,
    body: string,
    issueId: string,
    userId: string,
    reactionData: LinearCommentReactionData[],
    user: {
        id: string,
        name: string
    },
    issue: {
        id: string,
        title: string,
        teamId: string
    }
};
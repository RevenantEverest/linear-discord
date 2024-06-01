/**
 * Linear webhook issue payload issue team shape
 */
export interface LinearIssueTeam {
    id: string,
    key: string,
    name: string
};

/**
 * Linear webhook issue payload issue state shape
 */
export interface LinearIssueState {
    id: string,
    color: string,
    name: string,
    type: string
};


/**
 * Linear webhook issue payload issue project shape
 */
export interface LinearIssueProject {
    id: string,
    name: string
};

/**
 * Linear webhook issue payload issue label shape
 */
export interface LinearIssueLabel {
    id: string,
    color: string,
    name: string
};

/**
 * Linear webhook **issue** payload. 
 * 
 * Appears as the `data` key of a `LinearPayload`
 */
export interface LinearIssue {
    id: string,
    createdAt: string,
    updatedAt: string,
    number: number,
    title: string,
    priority: number,
    boardOrder: number,
    sortOrder: number,
    labelIds: string[],
    teamId: string,
    previousIdentifiers: unknown[], // some type of array
    creatorId: string,
    stateId: string,
    priorityLabel: string // consider string literal,
    botActor: null, // might also be something else, not sure what bot is
    identifier: string,
    url: string,
    project?: LinearIssueProject,
    state: LinearIssueState,
    team: LinearIssueTeam,
    subscriberIds: string[],
    description?: string,
    descriptionData?: JSON,
    labels: LinearIssueLabel[]
};
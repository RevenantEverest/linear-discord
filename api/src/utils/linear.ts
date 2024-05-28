import type { LinearIssue } from '@@types/linear/linearIssue.js';
import type { LinearComment } from '@@types/linear/linearComment.js';

export function isIssue(data: LinearIssue | LinearComment): data is LinearIssue {
    return (data as LinearIssue).priority !== undefined;
};

export function isComment(data: LinearIssue | LinearComment): data is LinearComment {
    return (data as LinearComment).body !== undefined;
};
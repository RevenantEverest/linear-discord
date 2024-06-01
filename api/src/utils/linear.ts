import type { LinearIssue } from '@@types/linear/linearIssue.js';
import type { LinearComment } from '@@types/linear/linearComment.js';

import * as crypto from 'crypto';

export function isIssue(data: LinearIssue | LinearComment): data is LinearIssue {
    return (data as LinearIssue).priority !== undefined;
};

export function isComment(data: LinearIssue | LinearComment): data is LinearComment {
    return (data as LinearComment).body !== undefined;
};

export function verifySignature(rawBody: Buffer, secret: string, sigHeader?: string | string[]): boolean {
    const signature = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");

    if(signature !== sigHeader) {
        return false;
    }

    return true;
};
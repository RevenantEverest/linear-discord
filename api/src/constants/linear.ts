import type { LinearPriority } from '@@types/linear/linearPayload.js';

export const PRIORITY_LABELS = Object.freeze({
    "0": "No Priority",
    "1": "Urgent",
    "2": "High",
    "3": "Medium",
    "4": "Low"
}) satisfies LinearPriority;
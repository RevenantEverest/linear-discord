import type { ZodString } from 'zod';

import { z } from 'zod';
import { LinearWebhook } from '@@entities/index.js';
import { validation } from '@@utils/index.js';

type LinearWebhookProperties = keyof Pick<LinearWebhook, (
    "guildId" | 
    "channelId" | 
    "label" |
    "signatureSecret"
)>;
type CreateSchema = Record<LinearWebhookProperties, ZodString>;

const errorMessages = validation.basicErrorMessages<LinearWebhookProperties>;

const create = z.object<CreateSchema>({
    guildId: z.string(errorMessages("guildId", "string")),
    channelId: z.string(errorMessages("channelId", "string")),
    label: z.string(errorMessages("label", "string")),
    signatureSecret: z.string(errorMessages("signatureSecret", "string"))
});

export default create;
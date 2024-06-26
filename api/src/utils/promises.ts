import { PromiseError, PromiseTuple, WaitForOptions } from '@@types/promises.js';

import * as logs from './logs.js';
import * as colors from './colors.js';

export async function handle<T, D = Error>(promise: Promise<T>): PromiseTuple<T, D> {
    return promise
    .then((results: T) => {
        return [results, undefined] as [T, undefined];
    })
    .catch((err: PromiseError<D>) => {
        return [undefined, err]
    });
};

export async function waitFor(conditionFunction: () => boolean, options?: WaitForOptions) {
    
    let retries = options?.retries ?? 5;
    const poll = (resolve: (value?: unknown) => void) => {
        if(retries < 0) {
            logs.error({ 
                color: colors.error, 
                type: "ERROR", 
                message: "waitFor method out of retries" 
            });
            process.exit(1);
        }

        if(conditionFunction()) {
            resolve();
        }
        else {
            retries -= 1;
            setTimeout(() => poll(resolve), options?.intervalLength ?? 400);
        }
    };

    return new Promise(poll);
};
import type { 
    Request as ExpressRequest, 
    Response as ExpressResponse, 
    NextFunction as ExpressNextFunction 
} from 'express';
import type { AuthPayload } from './auth.js';

export interface LocalsPagination {
    page: number,
    limit: number,
    offset: number
};

/**
 * Shape of potential Response Locals (`res.locals`) object
 */
export interface Locals<T> {
    pagination: LocalsPagination, 
    auth: AuthPayload,
    params: T
};

/**
 * Used with Response type in order to allow for having multiple choices for Locals keys to exist in Response
 */
export type PickLocals<D, T extends keyof Locals<D>> = {
    [K in T]: Locals<D>[K];
};

export interface Request<T = unknown, D = unknown> extends ExpressRequest<D, unknown, T> {
    rawBody?: Buffer;
};

/**
 * 
 */
export type Response<T extends keyof Locals<D> | (keyof Locals<D>)[] | undefined = undefined, D = unknown> = (
    T extends undefined ? ExpressResponse :
    T extends keyof Locals<D> ? ExpressResponse<unknown, Pick<Locals<D>, T>> :
    T extends (keyof Locals<D>)[] ? ExpressResponse<unknown, PickLocals<D, T[number]>> :
    never
);

export type NextFunction = ExpressNextFunction;
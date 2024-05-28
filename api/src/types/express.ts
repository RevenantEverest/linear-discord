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

export interface Locals<T> {
    pagination: LocalsPagination, 
    auth: AuthPayload,
    params: T
};

export interface Request<T = unknown, D = unknown> extends ExpressRequest<D, unknown, T> {
    rawBody?: Buffer;
};

export type Response<T extends keyof Locals<D> = "params", D = unknown> = ExpressResponse<unknown, Pick<Locals<D>, T>>
export type NextFunction = ExpressNextFunction;
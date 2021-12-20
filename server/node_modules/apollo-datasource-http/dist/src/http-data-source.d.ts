/// <reference types="node" />
import { DataSource, DataSourceConfig } from 'apollo-datasource';
import { Pool } from 'undici';
import { HttpMethod, ResponseData } from 'undici/types/dispatcher';
import { EventEmitter } from 'stream';
import { Logger } from 'apollo-server-types';
declare type AbortSignal = unknown;
export declare class RequestError<T = unknown> extends Error {
    message: string;
    code: number;
    request: Request;
    response: Response<T>;
    constructor(message: string, code: number, request: Request, response: Response<T>);
}
export declare type CacheTTLOptions = {
    requestCache?: {
        maxTtl: number;
        maxTtlIfError: number;
    };
};
interface Dictionary<T> {
    [Key: string]: T | undefined;
}
export declare type RequestOptions = Omit<Partial<Request>, 'origin' | 'path' | 'method'>;
export declare type Request<T = unknown> = {
    context: Dictionary<string>;
    query: Dictionary<string | number>;
    body: T;
    signal?: AbortSignal | EventEmitter | null;
    json?: boolean;
    origin: string;
    path: string;
    method: HttpMethod;
    headers: Dictionary<string>;
} & CacheTTLOptions;
export declare type Response<TResult> = {
    body: TResult;
    memoized: boolean;
    isFromCache: boolean;
    maxTtl?: number;
} & Omit<ResponseData, 'body'>;
export interface LRUOptions {
    readonly maxAge?: number;
    readonly maxSize: number;
}
export interface HTTPDataSourceOptions {
    logger?: Logger;
    pool?: Pool;
    requestOptions?: RequestOptions;
    clientOptions?: Pool.Options;
    lru?: Partial<LRUOptions>;
}
export declare abstract class HTTPDataSource<TContext = any> extends DataSource {
    readonly baseURL: string;
    private readonly options?;
    context: TContext;
    private pool;
    private logger?;
    private cache;
    private globalRequestOptions?;
    private readonly memoizedResults;
    constructor(baseURL: string, options?: HTTPDataSourceOptions | undefined);
    private buildQueryString;
    initialize(config: DataSourceConfig<TContext>): void;
    protected isResponseOk(statusCode: number): boolean;
    protected isResponseCacheable<TResult = unknown>(request: Request, response: Response<TResult>): boolean;
    protected onCacheKeyCalculation(request: Request): string;
    protected onRequest?(request: Request): Promise<void>;
    protected onResponse<TResult = unknown>(request: Request, response: Response<TResult>): Response<TResult>;
    protected onError?(_error: Error, requestOptions: Request): void;
    get<TResult = unknown>(path: string, requestOptions?: RequestOptions): Promise<Response<TResult>>;
    post<TResult = unknown>(path: string, requestOptions?: RequestOptions): Promise<Response<TResult>>;
    delete<TResult = unknown>(path: string, requestOptions?: RequestOptions): Promise<Response<TResult>>;
    put<TResult = unknown>(path: string, requestOptions?: RequestOptions): Promise<Response<TResult>>;
    patch<TResult = unknown>(path: string, requestOptions?: RequestOptions): Promise<Response<TResult>>;
    private performRequest;
    private request;
}
export {};
//# sourceMappingURL=http-data-source.d.ts.map
export type RestHandler<T, Input = unknown, Id = unknown> = (params: {
    input: Input;
    id?: Id;
}) => (originalUrl: string) => Promise<T>;
export type GETRestHandler<T, Input = unknown, Id = unknown> = (params?: {
    input?: Input;
    id?: Id;
}) => (originalUrl: string) => Promise<T>;

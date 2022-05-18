export type RestHandler<T, Input = unknown, Id = unknown> = (
    input?: Input
) => (id?: Id) => (originalUrl: string) => Promise<T>;

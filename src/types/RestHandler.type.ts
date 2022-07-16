export type RestHandler<Input = unknown, T = unknown> = (
    input: Input
) => (originalUrl: string) => Promise<T>;
export type GETRestHandler<Input = unknown, T = unknown> = (
    input?: Input
) => (originalUrl: string) => Promise<T>;

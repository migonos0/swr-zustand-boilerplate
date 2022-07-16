export type Action<Type extends string, Payload = unknown> = {
    type: Type;
    payload?: Partial<Payload>;
};

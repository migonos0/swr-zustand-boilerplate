export type Action<Type extends string, Payload> = {
  type: Type;
  payload?: Partial<Payload>;
};

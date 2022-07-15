import {RestEndpoint} from './RestEndpoint.type';
import {Action} from './Action.type';

export type ActionHandler<Type extends string, Payload, Input, Id = unknown> = (
    dispatcher: (action: Action<Type, Payload>) => void
) => (params: {input?: Input; id?: Id}) => void;

export type HttpActionHandler<
    Type extends string,
    Payload,
    Input,
    Id = unknown
> = (
    dispatcher: (action: Action<Type, Payload>) => void
) => (params: {
    input?: Input;
    id?: Id;
}) => (restEndpoint: RestEndpoint) => Promise<void>;

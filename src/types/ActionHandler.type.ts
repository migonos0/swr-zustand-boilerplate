import {RestEndpoint} from './RestEndpoint.type';
import {Action} from './Action.type';

export type ActionHandler<Type extends string, Payload, Input, Id = unknown> = (
    input?: Input
) => (
    id?: Id
) => (
    restEndpoint?: RestEndpoint
) => (
    dispatcher: (action: Action<Type, Payload>) => void
) => Promise<void> | void;

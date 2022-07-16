import {Action} from './Action.type';
import {Dispatcher} from './Dispatcher.type';
import {RestEndpoint} from './RestEndpoint.type';

export type ActionHandler<Input, T extends Dispatcher<Action<any>>> = (
    input?: Input
) => (dispatcher: T) => void;

export type HttpActionHandler<Input, T extends Dispatcher<Action<any>>> = (
    input: Input
) => (dispatcher: T) => (restEndpoint: RestEndpoint) => Promise<void>;

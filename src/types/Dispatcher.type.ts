import {Action} from './Action.type';

export type Dispatcher<Type extends Action<any>> = (action: Type) => void;

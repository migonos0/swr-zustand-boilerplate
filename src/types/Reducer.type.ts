import {Action} from './Action.type';
import {State} from './State.type';

export type Reducer<
    SliceState extends State<any>,
    SliceAction extends Action<any>
> = (state: SliceState, action: SliceAction) => SliceState;

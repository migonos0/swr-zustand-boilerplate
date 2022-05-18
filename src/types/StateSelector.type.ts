import {GlobalState} from '../services/store/useStore';

export type StateSelector<State> = (state: GlobalState) => State;

import {StoreApi, UseBoundStore} from 'zustand';
import {GlobalState} from '../services/store/useStore';
import {Action} from './Action.type';
import {Dispatcher} from './Dispatcher.type';

export type DispatchGetter<T extends Action<any>> = (
    useStore: UseBoundStore<StoreApi<GlobalState>>
) => Dispatcher<T>;

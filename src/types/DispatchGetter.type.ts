import {StoreApi, UseBoundStore} from 'zustand';
import {GlobalState} from '../services/store/useStore';
import {Action} from './Action.type';

export type DispatchGetter<Type extends string, Payload> = (
    useStore: UseBoundStore<StoreApi<GlobalState>>
) => (action: Action<Type, Payload>) => void;

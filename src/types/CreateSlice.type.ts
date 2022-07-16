import {GetState, SetState} from 'zustand';

export type CreateSlice<GlobalState extends object, Slice> = (
    set: SetState<GlobalState>,
    get: GetState<GlobalState>
) => Slice;

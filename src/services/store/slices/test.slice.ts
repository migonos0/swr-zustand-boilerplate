import {CreateSlice} from '../../../types/CreateSlice.type';
import {Reducer} from '../../../types/Reducer.type';
import {GlobalState} from '../useStore';
import {Action} from '../../../types/Action.type';
import {TEST} from '../actiontypes/TEST.actiontype';
import {DispatcherGetter} from '../../../types/DispatcherGetter.type';
import {StateSelector} from '../../../types/StateSelector.type';
import {Test} from '../../../interfaces/Test.interface';
import {HttpRequestMethod} from '../../../types/HttpRequestMethod.type';

interface SliceState {
    loading: boolean;
    success: boolean;
    message: string;
    requestedOriginalUrl: string;
    requestedMethod: HttpRequestMethod;
    test: Test;
}

const initialState: SliceState = {
    loading: true,
    success: true,
    message: '',
    requestedOriginalUrl: '',
    requestedMethod: 'POST',
    test: {
        _id: '',
        createdAt: new Date(),
        isActive: true,
        name: '',
        updatedAt: new Date(),
    },
};

type ActionPayload = SliceState;
type SliceAction = Action<TEST, ActionPayload>;

const reducer: Reducer<SliceState, SliceAction> = (state, action) => {
    switch (action.type) {
        case 'CREATE_LOCAL_TEST': {
            return {
                ...state,
                message: action.payload?.message ?? state.message,
            };
        }
        case 'TEST_ACTION_LOADING': {
            return {
                ...state,
                loading: action.payload?.loading ?? state.loading,
                success: action.payload?.success ?? state.success,
            };
        }
        case 'TEST_ACTION_SUCCESS': {
            return {
                ...state,
                loading: action.payload?.loading ?? state.loading,
                success: action.payload?.success ?? state.success,
                message: action.payload?.message ?? state.message,
                requestedMethod:
                    action.payload?.requestedMethod ?? state.requestedMethod,
                requestedOriginalUrl:
                    action.payload?.requestedOriginalUrl ??
                    state.requestedOriginalUrl,
                test: action.payload?.test ?? state.test,
            };
        }
        case 'TEST_ACTION_FAILED': {
            return {
                ...state,
                loading: action.payload?.loading ?? state.loading,
                success: action.payload?.success ?? state.success,
                message: action.payload?.message ?? state.message,
            };
        }
        default:
            return state;
    }
};

export interface TestSlice {
    testState: SliceState;
    testDispatcher: (action: SliceAction) => void;
}

export const createTestSlice: CreateSlice<GlobalState, TestSlice> = (
    set,
    get
) => {
    return {
        testState: initialState,
        testDispatcher: (action) =>
            set({
                testState: reducer(get().testState, action),
            }),
    };
};

export const getTestDispatcher: DispatcherGetter<TEST, ActionPayload> = (
    useStore
) => useStore.getState().testDispatcher;
export const testStateSelector: StateSelector<SliceState> = (state) =>
    state.testState;

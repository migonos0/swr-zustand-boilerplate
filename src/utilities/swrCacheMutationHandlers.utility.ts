import {KeyedMutator} from 'swr';
import {RestEndpoint} from '../types/RestEndpoint.type';

interface RestEndpointCallbacks {
    restEndpoint: RestEndpoint;
    callback: () => void;
}

export const handleGlobalStateChange = (params: {
    loading: boolean;
    success: boolean;
    loadingCallback?: () => void;
    successCallback?: () => void;
    failedCallback?: () => void;
}) => {
    if (params.loading && !params.success) {
        params.loadingCallback && params.loadingCallback();
        return;
    }
    if (!params.loading && params.success) {
        params.successCallback && params.successCallback();
        return;
    }
    if (!params.loading && !params.success) {
        params.failedCallback && params.failedCallback();
        return;
    }
};

export const execCallbackByRequestedRestEndpoint = (params: {
    requestedRestEndpoint: RestEndpoint;
    restEndpointsCallbacks: RestEndpointCallbacks[];
}) => {
    for (const restEndpointsCallback of params.restEndpointsCallbacks) {
        if (
            restEndpointsCallback.restEndpoint.method ===
                params.requestedRestEndpoint.method &&
            restEndpointsCallback.restEndpoint.originalUrl ===
                params.requestedRestEndpoint.originalUrl
        ) {
            restEndpointsCallback.callback();
            return;
        }
    }
};

export const addSWRCache = <T>(params: {
    currentStates: T[] | undefined;
    newState: T;
    mutator: KeyedMutator<T[]>;
}) => {
    params.mutator([...(params.currentStates ?? []), ...[params.newState]]);
};
export const updateSWRCache = <T>(params: {
    currentStates: T[] | undefined;
    newState: T;
    mutator: KeyedMutator<T[]>;
}) => {
    params.mutator(
        params.currentStates?.map((currentState) =>
            currentState === params.newState ? params.newState : currentState
        )
    );
};
export const deleteSWRCache = <T>(params: {
    currentStates: T[] | undefined;
    newState: T;
    mutator: KeyedMutator<T[]>;
}) => {
    params.mutator(
        params.currentStates?.filter(
            (currentState) => currentState !== params.newState
        )
    );
};

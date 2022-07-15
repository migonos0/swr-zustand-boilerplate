import {useEffect, useState} from 'react';
import useSWR from 'swr';
import {
    CREATE_ONE_TEST_RESTENDPOINT,
    DELETE_ONE_TEST_BY_ID_RESTENDPOINT,
    FIND_ALL_TESTS_RESTENDPOINT,
    UPDATE_ONE_TEST_BY_ID_RESTENDPOINT,
} from './constants/restEndpoints/test.restEndpoint';
import {
    createLocalTestActionHandler,
    createOneTestActionHandler,
    deleteOneTestByIdActionHandler,
    updateOneTestByIdActionHandler,
} from './services/store/actionHandlers/test.actionHandler';
import {
    getTestDispatcher,
    testStateSelector,
} from './services/store/slices/test.slice';
import {useStore} from './services/store/useStore';
import {findAllTestsHandler} from './services/webApis/restHandlers/test.restHandler';
import {
    addSWRCache,
    deleteSWRCache,
    execCallbackByRequestedRestEndpoint,
    handleGlobalStateChange,
    updateSWRCache,
} from './utilities/swrCacheMutationHandlers';

function App() {
    const {data: tests, mutate: testsMutator} = useSWR(
        FIND_ALL_TESTS_RESTENDPOINT.originalUrl,
        findAllTestsHandler()
    );
    const testState = useStore(testStateSelector);
    const [localInput, setLocalInput] = useState('');
    const [remoteInput, setRemoteInput] = useState('');
    const [localNotification, setLocalNotification] = useState('Ready');

    useEffect(() => {
        handleGlobalStateChange({
            loading: testState.loading,
            success: testState.success,
            successCallback() {
                setLocalNotification('Success ' + testState.message);
                execCallbackByRequestedRestEndpoint({
                    requestedRestEndpoint: {
                        method: testState.requestedEndpoint.method,
                        originalUrl: testState.requestedEndpoint.originalUrl,
                    },
                    restEndpointsCallbacks: [
                        {
                            restEndpoint: CREATE_ONE_TEST_RESTENDPOINT,
                            callback() {
                                addSWRCache({
                                    currentStates: tests,
                                    newState: testState.test,
                                    mutator: testsMutator,
                                });
                            },
                        },
                        {
                            restEndpoint: UPDATE_ONE_TEST_BY_ID_RESTENDPOINT,
                            callback() {
                                updateSWRCache({
                                    currentStates: tests,
                                    newState: testState.test,
                                    mutator: testsMutator,
                                });
                            },
                        },
                        {
                            restEndpoint: DELETE_ONE_TEST_BY_ID_RESTENDPOINT,
                            callback() {
                                deleteSWRCache({
                                    currentStates: tests,
                                    newState: testState.test,
                                    mutator: testsMutator,
                                });
                            },
                        },
                    ],
                });
            },
        });
    }, [testState.loading, testState.success]);

    return (
        <>
            <p>{localNotification}</p>
            <h1>Local</h1>
            <input
                type={'text'}
                onChange={(e) => setLocalInput(e.target.value)}
            ></input>
            <button
                type="button"
                onClick={() => {
                    createLocalTestActionHandler(getTestDispatcher(useStore))({
                        input: localInput,
                    });
                }}
            >
                Send
            </button>
            <p>Current state: {testState.message}</p>

            <h1>Remote</h1>
            <input
                type={'text'}
                onChange={(e) => setRemoteInput(e.target.value)}
            ></input>
            <button
                type="button"
                onClick={() => {
                    createOneTestActionHandler(getTestDispatcher(useStore))({
                        input: {
                            name: remoteInput,
                        },
                    })(CREATE_ONE_TEST_RESTENDPOINT);
                }}
            >
                Send
            </button>
            <ul>
                {tests &&
                    tests.map((test, index) => (
                        <div key={index}>
                            <li>{test.name}</li>
                            <button
                                type="button"
                                onClick={() => {
                                    updateOneTestByIdActionHandler(
                                        getTestDispatcher(useStore)
                                    )({
                                        input: {name: remoteInput},
                                        id: test.id,
                                    })(UPDATE_ONE_TEST_BY_ID_RESTENDPOINT);
                                }}
                            >
                                Update
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    deleteOneTestByIdActionHandler(
                                        getTestDispatcher(useStore)
                                    )({id: test.id})(
                                        DELETE_ONE_TEST_BY_ID_RESTENDPOINT
                                    );
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    ))}
            </ul>
        </>
    );
}

export default App;

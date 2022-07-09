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

function App() {
    const {data: tests, mutate: testsMutator} = useSWR(
        FIND_ALL_TESTS_RESTENDPOINT.originalUrl,
        findAllTestsHandler()()
    );
    const testState = useStore(testStateSelector);
    const [localInput, setLocalInput] = useState('');
    const [remoteInput, setRemoteInput] = useState('');
    const [localNotification, setLocalNotification] = useState('Ready');

    useEffect(() => {
        if (!testState.loading && testState.success) {
            setLocalNotification('Success ' + testState.message);
            switch (testState.requestedMethod) {
                case 'POST': {
                    switch (testState.requestedOriginalUrl) {
                        case CREATE_ONE_TEST_RESTENDPOINT.originalUrl: {
                            testsMutator([
                                ...(tests ?? []),
                                ...[testState.test],
                            ]);
                            return;
                        }
                    }
                    return;
                }
                case 'PUT': {
                    switch (testState.requestedOriginalUrl) {
                        case UPDATE_ONE_TEST_BY_ID_RESTENDPOINT.originalUrl: {
                            testsMutator(
                                tests?.map((test) =>
                                    test._id === testState.test._id
                                        ? testState.test
                                        : test
                                )
                            );
                            return;
                        }
                    }
                    return;
                }
                case 'DELETE': {
                    switch (testState.requestedOriginalUrl) {
                        case DELETE_ONE_TEST_BY_ID_RESTENDPOINT.originalUrl: {
                            testsMutator(
                                tests?.filter(
                                    (test) => test._id !== testState.test._id
                                )
                            );
                            return;
                        }
                    }
                }
            }
        }
        if (!testState.loading && !testState.success) {
            setLocalNotification('Error ' + testState.message);
        }
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
                    createLocalTestActionHandler(localInput)()()(
                        getTestDispatcher(useStore)
                    );
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
                    createOneTestActionHandler({name: remoteInput})()(
                        CREATE_ONE_TEST_RESTENDPOINT
                    )(getTestDispatcher(useStore));
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
                                    updateOneTestByIdActionHandler({
                                        name: remoteInput,
                                    })(test._id)(UPDATE_ONE_TEST_BY_ID_RESTENDPOINT)(
                                        getTestDispatcher(useStore)
                                    );
                                }}
                            >
                                Update
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    deleteOneTestByIdActionHandler()(test._id)(
                                        DELETE_ONE_TEST_BY_ID_RESTENDPOINT
                                    )(getTestDispatcher(useStore));
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

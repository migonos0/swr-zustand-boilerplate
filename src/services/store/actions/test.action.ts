import {CreateOneTestInput} from '../../../schemas/test.schema';
import {ActionHandler} from '../../../types/ActionHandler.type';
import {findActionErrorMessage} from '../../../utilities/findActionErrorMessage.utility';
import {createOneTestHandler} from '../../webapis/rest/test.rest';
import {TEST} from '../actiontypes/TEST.actiontype';
import {GlobalState} from '../useStore';

export const createLocalTestActionHandler: ActionHandler<
    TEST,
    GlobalState['testState'],
    string
> = (input) => () => () => (dispatcher) => {
    try {
        dispatcher({
            type: 'CREATE_LOCAL_TEST',
            payload: {
                message: input,
            },
        });
    } catch (error) {
        console.log(error);
    }
};

export const createOneTestActionHandler: ActionHandler<
    TEST,
    GlobalState['testState'],
    CreateOneTestInput
> = (input) => () => (restEndpoint) => async (dispatcher) => {
    try {
        dispatcher({
            type: 'TEST_ACTION_LOADING',
            payload: {
                loading: true,
                success: false,
            },
        });
        if (!restEndpoint) return;
        const createdTest = await createOneTestHandler(input)()(
            restEndpoint.originalUrl
        );
        dispatcher({
            type: 'TEST_ACTION_SUCCESS',
            payload: {
                loading: false,
                success: true,
                message: 'Test successfully created',
                requestedMethod: restEndpoint.method,
                requestedOriginalUrl: restEndpoint.originalUrl,
                test: createdTest,
            },
        });
    } catch (error) {
        dispatcher({
            type: 'TEST_ACTION_FAILED',
            payload: {
                loading: false,
                success: false,
                message: findActionErrorMessage(error),
            },
        });
    }
};

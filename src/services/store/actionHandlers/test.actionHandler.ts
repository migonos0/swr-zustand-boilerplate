import {
    CreateOneTestInput,
    DeleteOneTestByIdInput,
    UpdateOneTestByIdInput,
} from '../../../schemas/test.schema';
import {ActionHandler} from '../../../types/ActionHandler.type';
import {findActionErrorMessage} from '../../../utilities/findActionErrorMessage.utility';
import {
    createOneTestRestHandler,
    deleteOneTestByIdRestHandler,
    updateOneTestByIdRestHandler,
} from '../../webApis/restHandlers/test.restHandler';
import {TEST_ACTIONTYPE} from '../actionTypes/test.actionType';
import {GlobalState} from '../useStore';

export const createLocalTestActionHandler: ActionHandler<
    TEST_ACTIONTYPE,
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
    TEST_ACTIONTYPE,
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
        const createdTest = await createOneTestRestHandler(input)()(
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
        findActionErrorMessage(error);
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

export const updateOneTestByIdActionHandler: ActionHandler<
    TEST_ACTIONTYPE,
    GlobalState['testState'],
    Omit<UpdateOneTestByIdInput, 'testId'>,
    UpdateOneTestByIdInput['testId']
> = (input) => (testId) => (endpoint) => async (dispatcher) => {
    try {
        dispatcher({
            type: 'TEST_ACTION_LOADING',
            payload: {
                loading: true,
                success: false,
            },
        });

        if (!endpoint) return;
        const updatedTest = await updateOneTestByIdRestHandler(input)(testId)(
            endpoint.originalUrl
        );
        dispatcher({
            type: 'TEST_ACTION_SUCCESS',
            payload: {
                loading: false,
                success: true,
                message: 'Test successfully updated',
                requestedMethod: endpoint.method,
                requestedOriginalUrl: endpoint.originalUrl,
                test: updatedTest,
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

export const deleteOneTestByIdActionHandler: ActionHandler<
    TEST_ACTIONTYPE,
    GlobalState['testState'],
    DeleteOneTestByIdInput,
    DeleteOneTestByIdInput['testId']
> = () => (testId) => (endpoint) => async (dispatcher) => {
    try {
        dispatcher({
            type: 'TEST_ACTION_LOADING',
            payload: {
                loading: true,
                success: false,
            },
        });
        if (!endpoint) return;
        const deletedTest = await deleteOneTestByIdRestHandler()(testId)(
            endpoint.originalUrl
        );
        dispatcher({
            type: 'TEST_ACTION_SUCCESS',
            payload: {
                loading: false,
                success: true,
                message: 'Test successfully deleted.',
                requestedMethod: endpoint.method,
                requestedOriginalUrl: endpoint.originalUrl,
                test: deletedTest,
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

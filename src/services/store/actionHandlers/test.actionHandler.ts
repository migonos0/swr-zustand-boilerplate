import {
    CreateOneTestInput,
    DeleteOneTestByIdInput,
    UpdateOneTestByIdInput,
} from '../../../schemas/test.schema';
import {
    ActionHandler,
    HttpActionHandler,
} from '../../../types/ActionHandler.type';
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
> = (dispatcher) => (params) => {
    try {
        dispatcher({
            type: 'CREATE_LOCAL_TEST',
            payload: {
                message: params.input,
            },
        });
    } catch (error) {
        console.log(error);
    }
};

export const createOneTestActionHandler: HttpActionHandler<
    TEST_ACTIONTYPE,
    GlobalState['testState'],
    CreateOneTestInput
> = (dispatcher) => (params) => async (restEndpoint) => {
    try {
        dispatcher({
            type: 'TEST_ACTION_LOADING',
            payload: {
                loading: true,
                success: false,
            },
        });
        const createdTest = await createOneTestRestHandler({
            input: {name: params.input?.name ?? ''},
        })(restEndpoint.originalUrl);
        dispatcher({
            type: 'TEST_ACTION_SUCCESS',
            payload: {
                loading: false,
                success: true,
                message: 'Test successfully created',
                test: createdTest,
                requestedEndpoint: restEndpoint,
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

export const updateOneTestByIdActionHandler: HttpActionHandler<
    TEST_ACTIONTYPE,
    GlobalState['testState'],
    Omit<UpdateOneTestByIdInput, 'testId'>,
    UpdateOneTestByIdInput['testId']
> = (dispatcher) => (params) => async (endpoint) => {
    try {
        dispatcher({
            type: 'TEST_ACTION_LOADING',
            payload: {
                loading: true,
                success: false,
            },
        });

        const updatedTest = await updateOneTestByIdRestHandler(params)(
            endpoint.originalUrl
        );
        dispatcher({
            type: 'TEST_ACTION_SUCCESS',
            payload: {
                loading: false,
                success: true,
                message: 'Test successfully updated',
                test: updatedTest,
                requestedEndpoint: endpoint,
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

export const deleteOneTestByIdActionHandler: HttpActionHandler<
    TEST_ACTIONTYPE,
    GlobalState['testState'],
    DeleteOneTestByIdInput,
    DeleteOneTestByIdInput['testId']
> = (dispatcher) => (params) => async (endpoint) => {
    try {
        dispatcher({
            type: 'TEST_ACTION_LOADING',
            payload: {
                loading: true,
                success: false,
            },
        });
        const deletedTest = await deleteOneTestByIdRestHandler(params)(
            endpoint.originalUrl
        );
        dispatcher({
            type: 'TEST_ACTION_SUCCESS',
            payload: {
                loading: false,
                success: true,
                message: 'Test successfully deleted.',
                test: deletedTest,
                requestedEndpoint: endpoint,
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

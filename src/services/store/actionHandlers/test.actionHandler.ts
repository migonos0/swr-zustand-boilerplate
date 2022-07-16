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
import {GlobalState} from '../useStore';

export const createLocalTestActionHandler: ActionHandler<
    string,
    GlobalState['testDispatcher']
> = (input) => (dispatcher) => {
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

export const createOneTestActionHandler: HttpActionHandler<
    CreateOneTestInput,
    GlobalState['testDispatcher']
> = (input) => (dispatcher) => async (restEndpoint) => {
    try {
        dispatcher({
            type: 'TEST_ACTION_LOADING',
            payload: {
                loading: true,
                success: false,
            },
        });
        const createdTest = await createOneTestRestHandler(input)(
            restEndpoint.originalUrl
        );
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
    UpdateOneTestByIdInput,
    GlobalState['testDispatcher']
> = (input) => (dispatcher) => async (endpoint) => {
    try {
        dispatcher({
            type: 'TEST_ACTION_LOADING',
            payload: {
                loading: true,
                success: false,
            },
        });

        const updatedTest = await updateOneTestByIdRestHandler(input)(
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
    DeleteOneTestByIdInput,
    GlobalState['testDispatcher']
> = (input) => (dispatcher) => async (endpoint) => {
    try {
        dispatcher({
            type: 'TEST_ACTION_LOADING',
            payload: {
                loading: true,
                success: false,
            },
        });
        const deletedTest = await deleteOneTestByIdRestHandler(input)(
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

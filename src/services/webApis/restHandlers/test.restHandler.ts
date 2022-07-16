import {Test} from '../../../interfaces/Test.interface';
import {
    CreateOneTestInput,
    DeleteOneTestByIdInput,
    FindOneTestByIdInput,
    UpdateOneTestByIdInput,
} from '../../../schemas/test.schema';
import {GETRestHandler, RestHandler} from '../../../types/RestHandler.type';
import {httpClient} from '../../../libs/httpClient.lib';

export const createOneTestRestHandler: RestHandler<CreateOneTestInput, Test> =
    (input) => async (originalUrl) => {
        return (await httpClient.post(originalUrl, input)).data;
    };

export const findOneTestByIdRestHandler: GETRestHandler<
    FindOneTestByIdInput,
    Test
> = (input) => async (originalUrl) => {
    return (await httpClient.get(`${originalUrl}/${input?.testId}`)).data;
};

export const findAllTestsHandler: GETRestHandler<void, Test[]> =
    () => async (originalUrl) => {
        return (await httpClient.get(originalUrl)).data;
    };

export const updateOneTestByIdRestHandler: RestHandler<
    UpdateOneTestByIdInput,
    Test
> = (input) => async (originalUrl) => {
    return (await httpClient.put(`${originalUrl}/${input.testId}`, input)).data;
};

export const deleteOneTestByIdRestHandler: RestHandler<
    DeleteOneTestByIdInput,
    Test
> = (input) => async (originalUrl) => {
    return (await httpClient.delete(`${originalUrl}/${input.testId}`)).data;
};

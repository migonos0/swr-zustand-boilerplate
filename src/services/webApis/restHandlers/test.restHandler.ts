import {Test} from '../../../interfaces/Test.interface';
import {
    CreateOneTestInput,
    DeleteOneTestByIdInput,
    FindOneTestByIdInput,
    UpdateOneTestByIdInput,
} from '../../../schemas/test.schema';
import {RestHandler} from '../../../types/RestHandler.type';
import {httpClient} from '../../../libs/httpClient.lib';

export const createOneTestRestHandler: RestHandler<Test, CreateOneTestInput> =
    (input) => () => async (originalUrl) => {
        return (await httpClient.post(originalUrl, input)).data;
    };

export const findOneTestByIdRestHandler: RestHandler<
    Test,
    FindOneTestByIdInput,
    FindOneTestByIdInput['testId']
> = () => (testId) => async (originalUrl) => {
    return (await httpClient.get(`${originalUrl}/${testId}`)).data;
};

export const findAllTestsHandler: RestHandler<Test[]> =
    () => () => async (originalUrl) => {
        return (await httpClient.get(originalUrl)).data;
    };

export const updateOneTestByIdRestHandler: RestHandler<
    Test,
    Omit<UpdateOneTestByIdInput, 'testId'>,
    UpdateOneTestByIdInput['testId']
> = (input) => (testId) => async (originalUrl) => {
    return (await httpClient.put(`${originalUrl}/${testId}`, input)).data;
};

export const deleteOneTestByIdRestHandler: RestHandler<
    Test,
    DeleteOneTestByIdInput,
    DeleteOneTestByIdInput['testId']
> = () => (testId) => async (originalUrl) => {
    return (await httpClient.delete(`${originalUrl}/${testId}`)).data;
};

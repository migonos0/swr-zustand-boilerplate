import {Test} from '../../../interfaces/Test.interface';
import {
    CreateOneTestInput,
    DeleteOneTestByIdInput,
    FindOneTestByIdInput,
    UpdateOneTestByIdInput,
} from '../../../schemas/test.schema';
import {GETRestHandler, RestHandler} from '../../../types/RestHandler.type';
import {httpClient} from '../../../libs/httpClient.lib';

export const createOneTestRestHandler: RestHandler<Test, CreateOneTestInput> =
    (params) => async (originalUrl) => {
        return (await httpClient.post(originalUrl, params?.input)).data;
    };

export const findOneTestByIdRestHandler: GETRestHandler<
    Test,
    FindOneTestByIdInput,
    FindOneTestByIdInput['testId']
> = (params) => async (originalUrl) => {
    return (await httpClient.get(`${originalUrl}/${params?.id}`)).data;
};

export const findAllTestsHandler: GETRestHandler<Test[]> =
    () => async (originalUrl) => {
        return (await httpClient.get(originalUrl)).data;
    };

export const updateOneTestByIdRestHandler: RestHandler<
    Test,
    Omit<UpdateOneTestByIdInput, 'testId'>,
    UpdateOneTestByIdInput['testId']
> = (params) => async (originalUrl) => {
    return (await httpClient.put(`${originalUrl}/${params?.id}`, params?.input))
        .data;
};

export const deleteOneTestByIdRestHandler: RestHandler<
    Test,
    DeleteOneTestByIdInput,
    DeleteOneTestByIdInput['testId']
> = (params) => async (originalUrl) => {
    return (await httpClient.delete(`${originalUrl}/${params?.id}`)).data;
};

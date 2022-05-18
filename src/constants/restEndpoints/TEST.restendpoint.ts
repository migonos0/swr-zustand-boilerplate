import {RestEndpoint} from '../../types/RestEndpoint.type';

export const CREATE_ONE_TEST: RestEndpoint = {
    method: 'POST',
    originalUrl: '/test',
};

export const FIND_ALL_TESTS: RestEndpoint = {
    method: 'GET',
    originalUrl: '/test',
};

export const FIND_ONE_TEST_BY_ID: RestEndpoint = {
    method: 'GET',
    originalUrl: '/test',
    dynamicOriginalUrl: '/test/:',
};

export const UPDATE_ONE_TEST_BY_ID: RestEndpoint = {
    method: 'PUT',
    originalUrl: '/test',
    dynamicOriginalUrl: '/test/:',
};

export const DELETE_ONE_TEST_BY_ID: RestEndpoint = {
    method: 'DELETE',
    originalUrl: '/test',
    dynamicOriginalUrl: '/test/:',
};

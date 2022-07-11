import {RestEndpoint} from '../../types/RestEndpoint.type';

export const CREATE_ONE_TEST_RESTENDPOINT: RestEndpoint = {
    method: 'POST',
    originalUrl: '/tests',
};

export const FIND_ALL_TESTS_RESTENDPOINT: RestEndpoint = {
    method: 'GET',
    originalUrl: '/tests',
};

export const FIND_ONE_TEST_BY_ID_RESTENDPOINT: RestEndpoint = {
    method: 'GET',
    originalUrl: '/tests',
    dynamicOriginalUrl: '/tests/:',
};

export const UPDATE_ONE_TEST_BY_ID_RESTENDPOINT: RestEndpoint = {
    method: 'PUT',
    originalUrl: '/tests',
    dynamicOriginalUrl: '/tests/:',
};

export const DELETE_ONE_TEST_BY_ID_RESTENDPOINT: RestEndpoint = {
    method: 'DELETE',
    originalUrl: '/tests',
    dynamicOriginalUrl: '/tests/:',
};

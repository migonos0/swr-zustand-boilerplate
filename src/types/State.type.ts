import {RestEndpoint} from './RestEndpoint.type';

export type State<T> = {
    loading: boolean;
    success: boolean;
    message: string;
    requestedEndpoint?: RestEndpoint;
    test?: T;
};

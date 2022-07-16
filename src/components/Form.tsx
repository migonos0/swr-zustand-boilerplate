import {Controller, useForm} from 'react-hook-form';
import {CreateOneTestInput, createOneTestSchema} from '../schemas/test.schema';
import {zodResolver} from '@hookform/resolvers/zod/dist/zod';
import {createOneTestActionHandler} from '../services/store/actionHandlers/test.actionHandler';
import {getTestDispatcher} from '../services/store/slices/test.slice';
import {useStore} from '../services/store/useStore';
import {CREATE_ONE_TEST_RESTENDPOINT} from '../constants/restEndpoints/test.restEndpoint';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {useCallback} from 'react';

export const Form = () => {
    const {control, handleSubmit} = useForm<CreateOneTestInput>({
        resolver: zodResolver(createOneTestSchema),
        defaultValues: {
            name: '',
        },
    });
    const onSubmit = useCallback((values: CreateOneTestInput) => {
        console.log(values);
        createOneTestActionHandler(values)(getTestDispatcher(useStore))(
            CREATE_ONE_TEST_RESTENDPOINT
        );
    }, []);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="name"
                control={control}
                render={({field, fieldState}) => (
                    <>
                        <InputText id={field.name} {...field} autoFocus />
                        <h1>{fieldState.error?.message}</h1>
                    </>
                )}
            />

            <Button type="submit" label="Submit" />
        </form>
    );
};

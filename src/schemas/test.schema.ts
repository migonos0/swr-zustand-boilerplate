import {boolean, number, object, optional, string, TypeOf} from 'zod';

export const createOneTestSchema = object({
    name: string({
        required_error: 'Name is required.',
    }).nonempty({message: 'Name must not be empty.'}),
});
export type CreateOneTestInput = TypeOf<typeof createOneTestSchema>;

export const findOneTestByIdSchema = object({
    testId: number({
        required_error: 'TestId is required.',
    }),
});
export type FindOneTestByIdInput = TypeOf<typeof findOneTestByIdSchema>;

export const updateOneTestByIdSchema = object({
    testId: number({
        required_error: 'TestId is required.',
    }),
    name: optional(string().min(1, {message: 'Name must not be empty.'})),
});
export type UpdateOneTestByIdInput = TypeOf<typeof updateOneTestByIdSchema>;

export const deleteOneTestByIdSchema = object({
    testId: number({
        required_error: 'TestId is required.',
    }),
});
export type DeleteOneTestByIdInput = TypeOf<typeof deleteOneTestByIdSchema>;

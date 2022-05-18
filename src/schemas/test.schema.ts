import {boolean, object, optional, string, TypeOf} from 'zod';

export const createOneTestSchema = object({
    name: string({
        required_error: 'Name is required.',
    }).nonempty({message: 'Name must not be empty.'}),
    isActive: optional(boolean()),
});
export type CreateOneTestInput = TypeOf<typeof createOneTestSchema>;

export const findOneTestByIdSchema = object({
    testId: string({
        required_error: 'TestId is required.',
    }).nonempty({message: 'TestId must not be empty.'}),
});
export type FindOneTestByIdInput = TypeOf<typeof findOneTestByIdSchema>;

export const updateOneTestByIdSchema = object({
    testId: string({
        required_error: 'TestId is required.',
    }).nonempty({message: 'TestId must not be empty.'}),

    name: optional(string().nonempty({message: 'Name must not be empty.'})),
    isActive: optional(boolean()),
});
export type UpdateOneTestByIdInput = TypeOf<typeof updateOneTestByIdSchema>;

export const deleteOneTestByIdSchema = object({
    testId: string({
        required_error: 'TestId is required.',
    }).nonempty({message: 'TestId must not be empty.'}),
});
export type DeleteOneTestByIdInput = TypeOf<typeof deleteOneTestByIdSchema>;

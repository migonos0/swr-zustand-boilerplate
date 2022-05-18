interface Error {
    type: string;
    error: {
        isKnown: boolean;
        message: string;
    };
    originalUrl: string;
}

export const findActionErrorMessage = (error: any) => {
    const data = error.response.data as Error;
    if (!data)
        return 'Un error inesperado ha ocurrido, por favor contacte a un administrador.';
    if (data.error.isKnown) return data.error.message;
    console.error(data);
    return 'Un error inesperado ha ocurrido, por favor contacte a un administrador.';
};

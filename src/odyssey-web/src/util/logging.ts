export const logInDev = (message: string): void => {
    if (import.meta.env.DEV) {
        console.log(message);
    }
};

export const logError = (message: string): void => {
    console.error(message);
};
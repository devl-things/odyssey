export const logInDev = (...args: any): void => {
    if (import.meta.env.DEV) {
        console.log(args);
    }
};

export const logError = (message: string): void => {
    console.error(message);
};
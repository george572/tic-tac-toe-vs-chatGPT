export const setLocalStorage = (key: string, value: any): void => {
    localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = (key: string): any | null => {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : null;
};

export const removeLocalStorage = (key: string): void => {
    localStorage.removeItem(key);
};
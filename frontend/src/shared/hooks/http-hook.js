import { useCallback, useRef, useState, useEffect } from 'react';

export const useHttpClient = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    // To prevent state change when current component has been taken off the screen
    const activeHttpRequest = useRef([]);

    const sendRequest = useCallback(async (url, method = 'GET', headers = {}, body = null) => {

        setIsLoading(true);
        const httpAbortCtrl = new AbortController();
        activeHttpRequest.current.push(httpAbortCtrl);

        try {

            const response = await fetch(url, {
                method,
                headers,
                body,
                // Cancel the request when page changes
                signal: httpAbortCtrl.signal
            });

            const data = await response.json();

            if (!response.ok)
                throw new Error(data.message);

            return data;

        } catch (err) {
            setError(err.message);
        }

        setIsLoading(false);
    }, []);

    const clearError = () => setError(null);

    // Abort all the request when current component unmounts
    useEffect(() => {
        return () => {
            activeHttpRequest.current.forEach(abortCtrl => abortCtrl.abort());
        };
    }, [])

    return {
        isLoading,
        error,
        sendRequest,
        clearError
    }

};

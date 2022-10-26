import { useCallback, useRef, useState, useEffect } from 'react';

const useHttpClient = () => {

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

            // Remove the request from abort controllers once the request completes
            activeHttpRequest.current = activeHttpRequest.current.filter(reqCtrl => reqCtrl !== httpAbortCtrl);

            if (!response.ok)
                throw new Error(data.message);

            setIsLoading(false);
            return data;

        } catch (err) {
            setError(err.message);
            setIsLoading(false);
            throw err;
        }

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

export default useHttpClient;
import { useState, useCallback, useEffect } from "react";

let logoutTimer;

const useAuth = () => {
    const [token, setToken] = useState(false);
    const [userId, setUserId] = useState(null);

    const [tokenExpirationDate, setTokenExpirationDate] = useState();

    const loginHandler = useCallback((userId, token, expirationDate) => {
        setToken(token);
        setUserId(userId);

        // A date object having current data and 1 hr
        const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);	// Get current time in hr
        setTokenExpirationDate(tokenExpirationDate);

        localStorage.setItem('userData', JSON.stringify({ userId, token, expiration: tokenExpirationDate.toISOString() }));
    }, []);

    const logoutHandler = useCallback(() => {
        setToken(null);
        setTokenExpirationDate(null);
        localStorage.removeItem('userData');
        setUserId(null);
    }, []);

    useEffect(() => {
        if (token && tokenExpirationDate) {
            const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
            logoutTimer = setTimeout(logoutHandler, remainingTime);
        }

        else {
            clearTimeout(logoutTimer);
        }

    }, [token, logoutHandler, tokenExpirationDate]);

    useEffect(() => {

        const storedData = JSON.parse(localStorage.getItem('userData'));

        // If we have stored data and token is still valid
        if (storedData && new Date(storedData.expiration) > new Date())
            loginHandler(storedData.userId, storedData.token, new Date(storedData.expiration));

    }, [loginHandler]);

    return {
        token,
        userId,
        loginHandler,
        logoutHandler
    }
};

export default useAuth;
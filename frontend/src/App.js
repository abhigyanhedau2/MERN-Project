import React, { useCallback, useState, useEffect } from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate
} from "react-router-dom";
import Users from './users/pages/Users';
import NewPlace from './places/pages/NewPlace';
import UserPlaces from './places/pages/UserPlaces';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import UpdatePlace from './places/pages/UpdatePlace';
import Auth from './users/pages/Auth';
import AuthContext from './shared/store/auth-context';

let logoutTimer;

function App() {

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

	let routes;

	if (token)
		routes = (
			<Routes>
				<Route exact path="/" element={<Users />} />
				<Route exact path="/:userId/places" element={<UserPlaces />} />
				<Route exact path="/places/new" element={<NewPlace />} />
				<Route exact path="/places/:placeId" element={<UpdatePlace />} />

				{/* Navigate redirect to the '/' path when no endpoint matches */}
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		);

	else
		routes = (
			<Routes>
				<Route exact path="/" element={<Users />} />
				<Route exact path="/:userId/places" element={<UserPlaces />} />
				<Route exact path="/auth" element={<Auth />} />

				{/* Navigate redirect to the '/' path when no endpoint matches */}
				<Route path="*" element={<Navigate to="/auth" replace />} />
			</Routes>
		);


	return (
		<AuthContext.Provider value={{
			isLoggedIn: !!token,
			token: token,
			userId: userId,
			login: loginHandler,
			logout: logoutHandler
		}}>
			<Router>
				<MainNavigation />
				<main className='main'>
					{routes}
				</main>
			</Router>
		</AuthContext.Provider>
	);
}

export default App;

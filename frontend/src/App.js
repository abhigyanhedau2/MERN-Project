import React, { useCallback, useState } from 'react';
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

function App() {

	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userId, setUserId] = useState(null);

	const loginHandler = useCallback((userId) => {
		setIsLoggedIn(true);
		setUserId(userId);
	}, []);

	const logoutHandler = useCallback(() => {
		setIsLoggedIn(false);
		setUserId(null);
	}, []);

	let routes;

	if (isLoggedIn)
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
			isLoggedIn: isLoggedIn,
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

import React, { Suspense } from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate
} from "react-router-dom";
// import Users from './users/pages/Users';
// import NewPlace from './places/pages/NewPlace';
// import UserPlaces from './places/pages/UserPlaces';
// import UpdatePlace from './places/pages/UpdatePlace';
// import Auth from './users/pages/Auth';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import AuthContext from './shared/store/auth-context';
import useAuth from './shared/hooks/auth-hook';
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner';

// Add Lazy Loading
const Users = React.lazy(() => import('./users/pages/Users'));
const NewPlace = React.lazy(() => import('./places/pages/NewPlace'));
const UserPlaces = React.lazy(() => import('./places/pages/UserPlaces'));
const UpdatePlace = React.lazy(() => import('./places/pages/UpdatePlace'));
const Auth = React.lazy(() => import('./users/pages/Auth'));

function App() {

	const { token, userId, loginHandler, logoutHandler } = useAuth();

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
					{/* Lazy loaded code is always wrapped with suspense */}
					<Suspense fallback={<div className='center'><LoadingSpinner /></div>}>
						{routes}
					</Suspense>
				</main>
			</Router>
		</AuthContext.Provider>
	);
}

export default App;

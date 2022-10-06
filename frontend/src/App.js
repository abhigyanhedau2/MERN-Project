import React from 'react';
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

function App() {
	return (
		<Router>
			<MainNavigation />
			<main className='main'>
				<Routes>
					<Route exact path="/" element={<Users />} />
					<Route exact path="/:userId/places" element={<UserPlaces />} />
					<Route exact path="/places/new" element={<NewPlace />} />
					<Route exact path="/places/:placeId" element={<UpdatePlace />} />
					<Route exact path="/auth" element={<Auth />} />

					{/* Navigate redirect to the '/' path when no endpoint matches */}
					<Route path="*" element={<Navigate to="/" replace />} />
				</Routes>
			</main>
		</Router>
	);
}

export default App;

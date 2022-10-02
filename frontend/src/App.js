import React from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate
} from "react-router-dom";
import Users from './users/pages/Users';
import NewPlace from './places/pages/NewPlace';

function App() {
	return (
		<Router>
			<Routes>
				<Route exact path="/" element={<Users />} />
				<Route exact path="/places/new" element={<NewPlace />} />

				{/* Navigate redirect to the '/' path when no endpoint matches */}
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</Router>
	);
}

export default App;

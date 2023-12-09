import PageSelectPlanet from './pages/PageSelectPlanet';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';
import AboutUs from './pages/About';
import Booking from './pages/Booking';
import Login from './pages/Login';
import Admin from './pages/Admin';

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path="/" element={<PageSelectPlanet />} />
					<Route path="/about" element={<AboutUs />} />
					<Route path="/booking" element={<Booking />} />
					<Route path="/login" element={<Login />} />
					<Route path="/admin" element={<Admin />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;

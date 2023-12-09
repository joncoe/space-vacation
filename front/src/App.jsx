import PageSelectPlanet from './pages/PageSelectPlanet';
import { Routes, Route } from 'react-router-dom';
import './App.scss';
import AboutUs from './pages/About';
import Booking from './pages/Booking';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Navigation from './components/Navigation';
import LostInSpace from './pages/LostInSpace';

function App() {
	return (
		<>
			<Navigation />
			<Routes>
				<Route path="/" element={<PageSelectPlanet />} />
				<Route path="/about" element={<AboutUs />} />
				<Route path="/booking" element={<Booking />} />
				<Route path="/login" element={<Login />} />
				<Route path="/admin" element={<Admin />} />
				<Route path="*" element={<LostInSpace />} />
			</Routes>
		</>
	);
}

export default App;

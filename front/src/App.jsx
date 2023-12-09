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
			<p className="copyright">
				Photos from{' '}
				<a href="http://nasa.gov" target="_blank" rel="noreferrer">
					NASA
				</a>
				,{' '}
				<a
					href="https://asdc.larc.nasa.gov/copyright-information#:~:text=Unless%20otherwise%20noted%2C%20all%20images,exhibits%2C%20and%20Internet%20web%20pages."
					target="_blank"
					rel="noreferrer"
				>
					available for general use
				</a>
				.
			</p>
		</>
	);
}

export default App;

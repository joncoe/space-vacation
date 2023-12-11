import { Link } from 'react-router-dom';
import PageSelectPlanet from './pages/PageSelectPlanet';
import { Routes, Route } from 'react-router-dom';
import useToken from './lib/useToken';
import AboutUs from './pages/About';
import Booking from './pages/Booking';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Privacy from './pages/Privacy';
import Navigation from './components/Navigation';
import LostInSpace from './pages/LostInSpace';
import PrivateRoutes from './components/PrivateRoutes';
import './App.scss';

function App() {
	const { token, removeToken, setToken } = useToken();
	return (
		<>
			<Navigation />
			<Routes>
				<Route path="/" element={<PageSelectPlanet />} />
				<Route path="/about" element={<AboutUs />} />
				<Route path="/booking" element={<Booking />} />
				<Route path="/login" element={<Login setToken={setToken} />} />
				<Route element={<PrivateRoutes />}>
					<Route path="/admin" element={<Admin />} />
				</Route>
				<Route path="/privacy" element={<Privacy />} />
				<Route path="*" element={<LostInSpace />} />
			</Routes>
			<footer>
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
				<p className="className copyright privacy">
					<Link to="/privacy">Privacy Policy</Link>
				</p>
			</footer>
		</>
	);
}

export default App;

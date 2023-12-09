import PageSelectPlanet from './pages/PageSelectPlanet';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';
import AboutUs from './pages/About';
import Booking from './pages/Booking';

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path="/" element={<PageSelectPlanet />} />
					<Route path="/about" element={<AboutUs />} />
					<Route path="/booking" element={<Booking />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;

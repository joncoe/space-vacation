import { Link } from 'react-router-dom';
import './Navigation.scss';

function Navigation() {
	return (
		<nav>
			<ul>
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/about">About</Link>
				</li>
				<li>
					<Link to="/booking">Book a trip</Link>
				</li>
				<li>
					<Link to="/login">Log in</Link>
				</li>
				<li>
					<Link to="/login">Admin</Link>
				</li>
			</ul>
		</nav>
	);
}

export default Navigation;

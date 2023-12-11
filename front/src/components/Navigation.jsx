import { NavLink } from 'react-router-dom';
import './Navigation.scss';

function Navigation({ token }) {
	return (
		<nav>
			<ul>
				<li>
					<NavLink to="/">Home</NavLink>
				</li>
				<li>
					<NavLink to="/about">About</NavLink>
				</li>
				<li>
					<NavLink to="/booking">Book a trip</NavLink>
				</li>
				<li>
					<NavLink to="/login">Log in</NavLink>
				</li>
				<li>
					<NavLink to="/admin">Admin</NavLink>
				</li>
			</ul>
		</nav>
	);
}

export default Navigation;

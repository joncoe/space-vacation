import { NavLink, useNavigate } from 'react-router-dom';
import './Navigation.scss';

function Navigation({ authToken, removeToken }) {
	const navigate = useNavigate();

	const logOutUser = () => {
		if (window.confirm('🔑 Are you sure you want to log out? 🔑')) {
			const httpReq = {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json; charset=UTF-8',
					'Access-Control-Allow-Origin': '*',
					Authorization: 'Bearer ' + authToken,
				},
				// body: JSON.stringify({ planetName: planetName }),
			};

			const logout = async () => {
				await fetch('/api/logout', httpReq)
					.then((response) => response.json())
					.then((data) => {
						removeToken();
						navigate('/');
					});
			};

			logout();
		}
	};
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
					<NavLink to="/admin">Admin</NavLink>
				</li>
				{authToken ? (
					<li className="self-end ml-auto log-out">
						<button className="cursor-pointer" onClick={logOutUser}>
							Log Out
						</button>
					</li>
				) : (
					<li className="self-end ml-auto log-in">
						<NavLink to="/login">Log in</NavLink>
					</li>
				)}
			</ul>
		</nav>
	);
}

export default Navigation;

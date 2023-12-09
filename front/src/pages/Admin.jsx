import { useState, useEffect } from 'react';
import './Admin.scss';

function Admin() {
	const [planetList, setPlanetList] = useState([]);
	useEffect(() => {
		const httpReq = {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json; charset=UTF-8',
				'Access-Control-Allow-Origin': '*',
			},
		};

		const fetchData = async () => {
			await fetch('/api/list', httpReq)
				.then((response) => response.json())
				.then((data) => {
					setPlanetList(data);
				});
		};

		fetchData();
	}, []);

	const deletePlanet = (planetName) => {
		if (
			window.confirm(
				'Are you sure? 💥 This cannot be undone. But you can add it back manually later'
			)
		) {
			console.log(planetName);
			const httpReq = {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json; charset=UTF-8',
					'Access-Control-Allow-Origin': '*',
				},
				body: JSON.stringify({ planetName: planetName }),
			};

			const deletePlanet = async () => {
				await fetch('/api/deletePlanet', httpReq)
					.then((response) => response.json())
					.then((data) => {
						console.log(data);
						// setPlanetList(data);
					});
			};
			deletePlanet();
			console.log(planetName);
		}
	};

	return (
		<>
			<div className="max-w-5xl m-auto mt-10">
				<h1 className="mb-5 inline-block bg-white p-3">Planet Admin</h1>
			</div>
			<div className="max-w-3xl m-auto">
				<h2 className="mb-5">Administer your planetary system</h2>
				<ul className="">
					{planetList.map((planet, i) => (
						<li className=" flex justify-between mb-3" key={planet + i}>
							{planet.Planet}
							<button
								onClick={() => {
									deletePlanet(planet.Planet);
								}}
							>
								delete planet
							</button>
						</li>
					))}
				</ul>
			</div>
		</>
	);
}

export default Admin;

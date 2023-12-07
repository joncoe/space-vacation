import { useState, useEffect } from 'react';
import useForm from './lib/useForm';
import './App.scss';

function App() {
	const [planetList, setPanetList] = useState([
		{ planet: 'none', distance: 0 },
	]);
	const [selectedPlanet, setSelectedPlanet] = useState(null);
	const [planetData, setPlanetData] = useState('');
	const { inputs, handleChange, clearForm, resetForm } = useForm({
		selectedPlanet: '',
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSelectedPlanet(inputs.selectedPlanet);
		resetForm();
		const httpReq = {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json; charset=UTF-8',
				'Access-Control-Allow-Origin': '*',
			},
			body: JSON.stringify(inputs),
		};

		await fetch('http://127.0.0.1:9030/api/getDistance', httpReq)
			.then((response) => response.json())
			.then((data) => {
				console.log('returned data are', data);
				setPlanetData(data);
			});
	};

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
			await fetch('http://127.0.0.1:9030/api/list', httpReq)
				// await fetch('http://127.0.0.1:9030/api/getNasaData', httpReq)
				.then((response) => response.json())
				.then((data) => {
					setPanetList(data);
				});
		};

		fetchData();
	}, []);

	return (
		<>
			<h1 className="mb-5">Space Vacation</h1>
			<div className="flex justify-around max-w-5xl m-auto">
				<div className="form w-1/2">
					<form onSubmit={handleSubmit}>
						<div className="field">
							<div>
								<label htmlFor="selectedPlanet">Choose a planet</label>
							</div>

							<label className="form-control w-full max-w-xs">
								<div className="label">
									<span className="label-text">
										Where do you want to boldly go?
									</span>
								</div>
								<select
									className="select select-bordered"
									name="selectedPlanet"
									id="selectedPlanet"
									onChange={handleChange}
									defaultValue={'none'}
								>
									<option disabled value="none">
										Choose a planet
									</option>
									{planetList.map((planet, i) => (
										<option
											key={planet.Planet + i}
											name="planet"
											value={planet.Planet}
										>
											{planet.Planet}
										</option>
									))}
								</select>
							</label>
						</div>
						<button type="submit" className="btn btn-primary">
							Let's go
						</button>
					</form>
				</div>
				<div className="form w-1/2 font-mono text-sm">
					{selectedPlanet && (
						<PlanetsData
							planetData={planetData}
							selectedPlanet={selectedPlanet}
						/>
					)}
				</div>
			</div>
		</>
	);
}

function PlanetsData({ planetData, selectedPlanet }) {
	return (
		<>
			<p>Amazing! You will travel to {selectedPlanet}!</p>
			<p>
				It's distance from the sun is{' '}
				<span className="font-semibold">{planetData.au}</span>&nbsp;
				<a
					href="https://en.wikipedia.org/wiki/Astronomical_unit#:~:text=The%20astronomical%20unit%20(symbol%3A%20au,)%20or%208.3%20light%2Dminutes"
					target="_blank"
					rel="noreferrer"
				>
					astronomical units
				</a>
				!
			</p>
			<p>
				Traveling by rocket at the speed of the Voyager probes will take you{' '}
				<span className="font-semibold">{planetData.voyagerTime}</span> years.
			</p>
			<p>
				By car, the travel time would be about{' '}
				<span className="font-semibold">{planetData.drivingTime}</span> years
			</p>
			<p>
				And it will take you about{' '}
				<span className="font-semibold">{planetData.walkingTime}</span> years to
				walk.
			</p>
		</>
	);
}

export default App;

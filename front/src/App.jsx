import { useState, useEffect } from 'react';
import useForm from './lib/useForm';
import './App.scss';

function App() {
	const [planetList, setPanetList] = useState([
		{ planet: 'none', distance: 0 },
	]);
	const [selectedPlanet, setSelectedPlanet] = useState('not yet');
	const [planetData, setPlanetData] = useState('');
	const { inputs, handleChange, clearForm, resetForm } = useForm({
		selectedPlanet: '',
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSelectedPlanet(e.value);
		// clearForm();
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
					console.log('response from list', data);
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
									<span className="label-text">Where do you want to go?</span>
									<span className="label-text-alt">Alt label</span>
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
								<div className="label">
									<span className="label-text-alt">Alt label</span>
									<span className="label-text-alt">Alt label</span>
								</div>
							</label>
						</div>
						<button type="submit" className="btn btn-primary">
							Let's go
						</button>
					</form>
				</div>
				<div className="form w-1/2">
					<p>Amazing! You will travel to {selectedPlanet}!</p>

					<p>
						It&apos;s distance from the sun is {planetData.au}&nbsp;
						<a
							href="https://en.wikipedia.org/wiki/Astronomical_unit#:~:text=The%20astronomical%20unit%20(symbol%3A%20au,)%20or%208.3%20light%2Dminutes"
							target="_blank"
							rel="noreferrer"
						>
							astronomical units.
						</a>
						!
					</p>
					<p>
						By car, the travel time would be about {planetData.drivingTime}{' '}
						years
					</p>
					{/* <p>Voyager probe speed would take you {planetData.voyagerTime}</p> */}
				</div>
			</div>

			{/*
			<h1 className="mb-5">Round trip server test 🛰</h1>
			<div className="flex justify-around">
				<div className="form w-1/2">
					<h2>Enter your information</h2>
					<form onSubmit={handleSubmit}>
						<div className="flex w-72 flex-col gap-6">
							<div className="form-control w-full max-w-xs">
								<label className="label">
									<span className="label-text">What is your name?</span>
								</label>
								<input
									type="text"
									placeholder="Your Name Please "
									name="name"
									value={inputs.name}
									onChange={handleChange}
									className="input input-bordered w-full max-w-xs"
								/>
								<label className="label">
									<span className="label-text">What is your email?</span>
								</label>
								<input
									type="email"
									placeholder="Email Please"
									name="email"
									value={inputs.email}
									onChange={handleChange}
									className="input input-bordered w-full max-w-xs"
								/>
							</div>
							<button className="btn  btn-primary" type="submit">
								Go
							</button>
							<button onClick={resetForm} className="btn">
								Reset
							</button>
						</div>
					</form>
				</div>
				<div className="w-1/2">
					<h3>Data</h3>
					<ul>
						<li>
							<span className="font-medium ">name:</span> <br />
							<span className="font-mono">{planetList.name}</span>
						</li>
						<li>
							<span className="font-medium ">email:</span> <br />
							<span className="font-mono">{planetList.email}</span>
						</li>
					</ul>
				</div>
			</div> */}
		</>
	);
}

export default App;

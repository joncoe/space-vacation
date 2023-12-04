import { useState, useEffect } from 'react';
import useForm from './lib/useForm';
import './App.scss';

function App() {
	const [planetData, setPlanetData] = useState({});
	const { inputs, handleChange, clearForm, resetForm } = useForm({
		name: '',
		email: '',
	});

	// const handleSubmit = async (e) => {
	// 	e.preventDefault();
	// 	clearForm();
	// 	const httpReq = {
	// 		method: 'POST',
	// 		headers: {
	// 			Accept: 'application/json',
	// 			'Content-Type': 'application/json; charset=UTF-8',
	// 			'Access-Control-Allow-Origin': '*',
	// 		},
	// 		body: JSON.stringify(inputs),
	// 	};

	// 	await fetch('http://127.0.0.1:9030/list', httpReq)
	// 		.then((response) => response.json())
	// 		.then((data) => {
	// 			setPlanetData(data);
	// 		});
	// };

	useEffect(() => {
		const httpReq = {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json; charset=UTF-8',
				'Access-Control-Allow-Origin': '*',
			},
			// body: JSON.stringify(inputs),
		};

		const fetchData = async () => {
			await fetch('http://127.0.0.1:9030/list', httpReq)
				.then((response) => response.json())
				.then((data) => {
					console.log('response from list', data);
					setPlanetData(data);
				});
		};

		fetchData();
	}, []);

	return (
		<>
			<ul>
				{planetData.map((planet) => (
					<li key={planet._id}>
						{planet.Planet}, {planet.SunDistanceAU}
					</li>
				))}
			</ul>
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
							<span className="font-mono">{planetData.name}</span>
						</li>
						<li>
							<span className="font-medium ">email:</span> <br />
							<span className="font-mono">{planetData.email}</span>
						</li>
					</ul>
				</div>
			</div> */}
		</>
	);
}

export default App;

import { useState, useEffect } from 'react';
import PlanetsData from './components/PlanetData';
import useForm from './lib/useForm';
import './App.scss';

function App() {
	const [planetList, setPanetList] = useState([
		{ planet: 'none', distance: 0 },
	]);
	const [selectedPlanet, setSelectedPlanet] = useState(null);
	const [planetData, setPlanetData] = useState({});
	const [astronomyImage, setAstronomyImage] = useState({});
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

		await fetch('/api/getDistance', httpReq)
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
			await fetch('/api/getNasaData', httpReq)
				// await fetch('http://127.0.0.1:9030/api/getNasaData', httpReq)
				.then((response) => response.json())
				.then((data) => {
					setPanetList(data.planets);
					setAstronomyImage(data.apod[0]);
				});
		};

		fetchData();
	}, []);

	return (
		<>
			<div className="max-w-5xl m-auto mt-10">
				<h1 className="mb-5 inline-block bg-white p-3">Space Vacation</h1>
			</div>
			<div className="flex justify-between max-w-5xl m-auto">
				<div className="form">
					<div className="  p-3 bg-white">
						<form onSubmit={handleSubmit}>
							<div className="field">
								<div>
									<label htmlFor="selectedPlanet">Choose a planet</label>
								</div>

								<label className="form-control w-full max-w-xs mb-5">
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
				</div>
				<div className=" p-3 w-1/4 font-mono text-sm">
					{selectedPlanet && (
						<PlanetsData
							planetData={planetData}
							selectedPlanet={selectedPlanet}
						/>
					)}
				</div>
			</div>
			<div
				className="background-image"
				style={{ backgroundImage: `url(${astronomyImage.url})` }}
			></div>
		</>
	);
}

export default App;

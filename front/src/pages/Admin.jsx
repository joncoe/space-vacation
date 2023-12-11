import { useState, useEffect } from 'react';
import useForm from '../lib/useForm';
import './Admin.scss';

function Admin({ authToken }) {
	const [planetList, setPlanetList] = useState([]);
	const backgroundImage = '/images/control-room.jpg';
	const { inputs, handleChange, clearForm, resetForm } = useForm({
		planetName: '',
		au: '',
	});
	useEffect(() => {
		const httpReq = {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json; charset=UTF-8',
				'Access-Control-Allow-Origin': '*',
				Authorization: 'Bearer ' + authToken,
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
			const httpReq = {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json; charset=UTF-8',
					'Access-Control-Allow-Origin': '*',
					Authorization: 'Bearer ' + authToken,
				},
				body: JSON.stringify({ planetName: planetName }),
			};

			const deletePlanet = async () => {
				await fetch('/api/deletePlanet', httpReq)
					.then((response) => response.json())
					.then((data) => {
						setPlanetList(data.planetList);
					});
			};
			deletePlanet();
			resetForm();
		}
	};
	const addNewPlanet = (planetData) => {
		const { planetName, au } = planetData;
		const httpReq = {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json; charset=UTF-8',
				'Access-Control-Allow-Origin': '*',
				Authorization: 'Bearer ' + authToken,
			},
			body: JSON.stringify({ planetName, au }),
		};

		const addPlanet = async () => {
			await fetch('/api/addPlanet', httpReq)
				.then((response) => response.json())
				.then((data) => {
					setPlanetList(data.planetList);
				});
		};
		addPlanet();
		resetForm();
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		addNewPlanet(inputs);
	};

	return (
		<>
			<div className="max-w-5xl m-auto mt-10">
				<h1 className="mb-5 inline-block bg-white p-3">Planet Admin</h1>
			</div>
			<div className="max-w-3xl m-auto">
				<h2 className="mb-5">Administer your planetary system</h2>
			</div>
			<div className="max-w-3xl m-auto">
				<div className="flex justify-between">
					<div className="w-4/12">
						<h3 className="mb-5">Planets currently in this system</h3>
						<ul className="">
							{planetList.map((planet, i) => (
								<li className=" flex justify-between mb-3" key={planet + i}>
									{planet.Planet}
									<button
										className={'delete'}
										onClick={() => {
											deletePlanet(planet.Planet);
										}}
									>
										[ delete ✖️ ]
									</button>
								</li>
							))}
						</ul>
					</div>
					<div className="w-1/3">
						<h3 className="mb-5">Add a planet</h3>
						<form onSubmit={handleSubmit}>
							<label className="form-control w-full max-w-xs mb-5">
								<div className="label">
									<span className="label-text">Planet Name</span>
								</div>
								<input
									type="text"
									placeholder="e.g. Mercury, C-245"
									className="input input-bordered w-full max-w-xs"
									value={inputs.planetName}
									name="planetName"
									onChange={handleChange}
								/>
							</label>
							<label className="form-control w-full max-w-xs">
								<div className="label">
									<span className="label-text">Distance from the sun</span>
								</div>
								<input
									type="number"
									placeholder="e.g. 2.7"
									className="input input-bordered w-full max-w-xs"
									value={inputs.au}
									name="au"
									onChange={handleChange}
									step="0.01"
									required
								/>
								<div className="label">
									<span className="label-text-alt">Use astronomical units</span>
									<span className="label-text-alt">Cannot be zero</span>
								</div>
							</label>
							<button type="submit" className="btn btn-primary mt-4">
								Add this planet
							</button>
						</form>
					</div>
				</div>
			</div>
			<div
				className="background-image"
				style={{ backgroundImage: `${backgroundImage}` }}
			></div>
		</>
	);
}

export default Admin;

import { useState, useEffect } from 'react';
import PlanetsData from '../components/PlanetData';
import useForm from '../lib/useForm';
import classNames from 'classnames';
import './PageSelectPlanet.scss';

function PageSelectPlanet() {
	const [planetList, setPanetList] = useState([
		{ planet: 'none', distance: 0 },
	]);
	const [selectedPlanet, setSelectedPlanet] = useState(null);
	const [planetData, setPlanetData] = useState({});
	const [showImage, setShowImage] = useState('');
	const [astronomyImage, setAstronomyImage] = useState({});
	const [backgroundImage, setBackgroundImage] = useState({});
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
				setPlanetData(data);
				setBackgroundImage('/images/' + data.selectedPlanet + '.jpg');
			})
			.catch((e) => {
				throw new Error(e);
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
				.then((response) => response.json())
				.then((data) => {
					setPanetList(data.planets);
					setAstronomyImage(data.apod[0]);
					setBackgroundImage(data.apod[0].url);
				});
		};

		fetchData();
	}, []);

	let photoViewerClass = classNames('image-info-container', {
		showViewer: showImage,
	});

	const showImageInfo = () => {
		setShowImage(true);
	};

	const hideImageInfo = () => {
		setShowImage(false);
	};

	return (
		<>
			<div className="max-w-5xl m-auto mt-10">
				<h1 className="mb-5 inline-block bg-white p-3  ml-4 md:ml-0">
					Space Vacation
				</h1>
			</div>
			<div className="lg:flex justify-between max-w-5xl m-auto">
				<div className="form">
					<div className=" flex">
						<form
							onSubmit={handleSubmit}
							className="flex md:block bg-white p-3 ml-4 md:ml-0"
						>
							<div className="field mr-3 md:mr-0">
								<div>
									<label htmlFor="selectedPlanet">Choose a planet</label>
								</div>

								<label className="form-control w-full max-w-xs md:mb-5">
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
				<div className="lg:w-1/2  text-sm">
					{selectedPlanet && (
						<PlanetsData
							planetData={planetData}
							selectedPlanet={selectedPlanet}
						/>
					)}
				</div>
			</div>
			<div className="photo-info">
				<button onClick={showImageInfo}>🔭 about this image</button>
			</div>
			<div className={photoViewerClass}>
				<div className="image-info">
					<div>
						<h4>{astronomyImage.title}</h4>
						<p>Date: {astronomyImage.date}</p>
						<p className="overflow-wrap">URL: {astronomyImage.url}</p>
						<p>{astronomyImage.explanation}</p>
					</div>
					<button onClick={hideImageInfo} className="close-button">
						[close]
					</button>
				</div>
			</div>
			<div
				className="background-image"
				style={{ backgroundImage: `url(${backgroundImage})` }}
			></div>
		</>
	);
}

export default PageSelectPlanet;

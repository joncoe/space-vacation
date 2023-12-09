import numeral from 'numeral';
import './PlanetData.scss';

function PlanetsData({ planetData, selectedPlanet }) {
	const formatNumber = (n) => {
		const myNumeral = numeral(n);
		return myNumeral.format('0,0.00') || 0;
	};
	return (
		<div>
			<div className="info-bit">
				<p>Amazing! You will travel to {selectedPlanet}!</p>
			</div>
			<div className="info-bit">
				<p>
					It's distance from earth is{' '}
					<span className="font-semibold">
						{formatNumber(planetData.distanceFromEarthAU)}
					</span>{' '}
					astronomical units, or{' '}
					<span className="font-semibold">
						{formatNumber(planetData.distanceFromEarthKM)} KM
					</span>
				</p>
			</div>

			<div className="info-bit">
				<p>
					It's distance from the sun is{' '}
					<span className="font-semibold">{formatNumber(planetData.au)}</span>
					&nbsp;
					<a
						href="https://en.wikipedia.org/wiki/Astronomical_unit#:~:text=The%20astronomical%20unit%20(symbol%3A%20au,)%20or%208.3%20light%2Dminutes"
						target="_blank"
						rel="noreferrer"
					>
						astronomical units
					</a>
					!
				</p>
			</div>
			<div className="info-bit">
				<p>
					Traveling by rocket at the speed of the Voyager probes will take you{' '}
					<span className="font-semibold">
						{formatNumber(planetData.voyagerTime)}
					</span>{' '}
					years.
				</p>
			</div>
			<div className="info-bit">
				<p>
					By car, the travel time would be about{' '}
					<span className="font-semibold">
						{formatNumber(planetData.drivingTime)}
					</span>{' '}
					years
				</p>
			</div>
			<div className="info-bit">
				<p>
					And it will take you about{' '}
					<span className="font-semibold">
						{formatNumber(planetData.walkingTime)}
					</span>{' '}
					years to walk.
				</p>
			</div>
		</div>
	);
}

export default PlanetsData;

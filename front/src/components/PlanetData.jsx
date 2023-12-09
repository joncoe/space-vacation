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

export default PlanetsData;

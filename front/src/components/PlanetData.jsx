import { useEffect } from 'react';
import { gsap } from 'gsap';
import numeral from 'numeral';
import './PlanetData.scss';

function PlanetsData({ planetData, selectedPlanet }) {
	const formatNumber = (n) => {
		const myNumeral = numeral(n);
		return myNumeral.format('0,0.00') || 0;
	};

	useEffect(() => {
		gsap.utils.toArray('.info-bit').forEach((bit, index) => {
			gsap.fromTo(
				bit,
				{ x: -500 },
				{
					x: 0,
					duration: 1.2 + 0.25 * index,
					ease: 'expo.out',
					delay: index * 0.16, // Stagger the animations
				}
			);
		});
	}, [planetData]);
	return (
		<div id="info-container">
			<div className="info-bit">
				<p>Amazing! You will travel to</p>
				<div className="planet-name">
					<span className="info-bit bg-white">{selectedPlanet}!</span>
				</div>
			</div>
			<div className="info-bit">
				<p>
					It's distance from the sun is{' '}
					<span className="font-bold">{formatNumber(planetData.au)}</span>
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
					It's distance from Earth{' '}
					<a
						href="https://lowell.edu/planets-in-opposition-this-year/#:~:text=Opposition%20occurs%20when%20a%20planet,and%20in%20its%20full%20phase."
						target="_blank"
						rel="noreferrer"
						class="page-link"
					>
						at opposition{' '}
					</a>
					is{' '}
					<span className="font-bold">
						{formatNumber(planetData.distanceFromEarthAU)}
					</span>{' '}
					astronomical units, or{' '}
					<span className="font-bold">
						{formatNumber(planetData.distanceFromEarthKM)} KM
					</span>
				</p>
			</div>

			<div className="info-bit">
				<p>
					Traveling at light speed, not so bad! It will take you{' '}
					<span className="font-bold">{planetData.lightSpeedTime}</span> hours
					to get there.
				</p>
			</div>
			<div className="info-bit">
				<p>
					Traveling by rocket at the speed of the Voyager probes will take you{' '}
					<span className="font-bold">
						{formatNumber(planetData.voyagerTime)}
					</span>{' '}
					years.
				</p>
			</div>
			<div className="info-bit">
				<p>
					By car, the travel time would be about{' '}
					<span className="font-bold">
						{formatNumber(planetData.drivingTime)}
					</span>{' '}
					years. You may want to consider our{' '}
					<a
						href="https://www.nbcnews.com/mach/tech/cryosleep-may-be-key-deep-space-missions-here-s-how-ncna770961"
						target="_blank"
						rel="noreferrer"
					>
						cryo-sleep
					</a>{' '}
					add-on.
				</p>
			</div>
			<div className="info-bit">
				<p>
					And it will take you about{' '}
					<span className="font-bold">
						{formatNumber(planetData.walkingTime)}
					</span>{' '}
					years to walk.
				</p>
			</div>
		</div>
	);
}

export default PlanetsData;

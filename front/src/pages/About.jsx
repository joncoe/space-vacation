import BackgroundImage from '../components/BackgroundImage';

function AboutUs() {
	return (
		<>
			<div>
				<div className="max-w-xl m-auto mt-10">
					<h1 className="mb-5 inline-block bg-white p-3">About Us</h1>
				</div>
				<div className="max-w-xl m-auto mt-10 bg-white p-3">
					We are a tiny travel agency with a big vision. We will take you to the
					stars! Actually, not that far. We will take you to any planet in our
					Solar System that we currently service.
				</div>
			</div>
			<BackgroundImage image={'/images/shuttle.jpg'} />
		</>
	);
}

export default AboutUs;

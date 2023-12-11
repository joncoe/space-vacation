import './Booking.scss';
function Booking() {
	return (
		<>
			<div className="max-w-xl m-auto mt-10">
				<h1 className="mb-5 inline-block bg-white p-3">Booking</h1>
			</div>
			<div className="max-w-xl m-auto mt-10  p-3">
				<div className="form">
					<div className=" flex">
						<form>
							<label className="form-control w-full max-w-xs mb-5">
								<div className="label">
									<span className="label-text text-white">Your name</span>
								</div>
								<input
									type="text"
									placeholder="Full name"
									className="input input-bordered w-full max-w-xs"
									name="planetName"
								/>
							</label>
							<label className="form-control w-full max-w-xs">
								<div className="label">
									<span className="label-text text-white">Your email</span>
								</div>
								<input
									type="text"
									placeholder="Enter your email"
									className="input input-bordered w-full max-w-xs"
									name="au"
								/>
							</label>
							<button type="submit" className="btn btn-primary mt-4">
								Join the wait list
							</button>
						</form>
					</div>
				</div>
			</div>
			<div className="background-image bg-image-book"></div>
		</>
	);
}

export default Booking;

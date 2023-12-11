import useForm from '../lib/useForm';
import './Login.scss';
function Login({ setToken }) {
	const { inputs, handleChange, clearForm, resetForm } = useForm({
		email: '',
		password: '',
	});
	const handleSubmit = (e) => {
		e.preventDefault();
		const { email, password } = inputs;
		console.log(inputs);
		const httpReq = {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json; charset=UTF-8',
				'Access-Control-Allow-Origin': '*',
			},
			body: JSON.stringify({ email, password }),
		};

		const logInUser = async () => {
			await fetch('/api/token', httpReq)
				.then((response) => response.json())
				.then((data) => {
					const { access_token } = data;
					setToken(access_token);
				});
		};
		logInUser();
	};

	return (
		<>
			<div className="max-w-5xl m-auto mt-10">
				<h1 className="mb-5 inline-block bg-white p-3">Login</h1>
			</div>
			<div className="max-w-5xl m-auto mt-10">
				<form onSubmit={handleSubmit} className="bg-white">
					<label className="form-control w-full max-w-xs mb-5">
						<div className="label">
							<span className="label-text">Email address</span>
						</div>
						<input
							type="text"
							placeholder="Enter your email address"
							className="input input-bordered w-full max-w-xs"
							value={inputs.email}
							name="email"
							onChange={handleChange}
						/>
					</label>
					<label className="form-control w-full max-w-xs">
						<div className="label">
							<span className="label-text">Password</span>
						</div>
						<input
							type="password"
							placeholder="Enter your password"
							className="input input-bordered w-full max-w-xs"
							value={inputs.password}
							name="password"
							onChange={handleChange}
							required
						/>
					</label>
					<button type="submit" className="btn btn-primary mt-4">
						Log in
					</button>
				</form>
			</div>
		</>
	);
}

export default Login;

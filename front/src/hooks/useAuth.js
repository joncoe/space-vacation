import { useState } from 'react';
export const useAuth = () => {
	const [user, setUser] = useState(null);

	const signIn = async (data) => {
		try {
			let authresult = await axios.post('/api/auth/login', data);
			let userObj = { ...authresult.data?.foundUser };
			userObj.token = authresult.data?.encodedToken;
			setUser(userObj);
			console.log('Login Successfull');
		} catch (err) {
			console.error(err);
			console.log('Login Failed');
		}
	};

	const signUp = async (data) => {
		try {
			let authresult = await axios.post('/api/auth/signup', data);
			let userObj = { ...authresult.data?.createdUser };
			userObj.token = authresult.data?.encodedToken;
			setUser(userObj);
			console.log('Sign Up Successfull');
		} catch (err) {
			console.error(err);
			console.log('An Error Occuered');
		}
	};

	const signOut = () => {
		setUser(null);
	};

	return { user, signIn, signUp, signOut };
};

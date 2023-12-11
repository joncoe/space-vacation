import { useState } from 'react';

function useToken() {
	function getToken() {
		const userToken = localStorage.getItem('spacePortalToken');
		return userToken && userToken;
	}

	const [token, setToken] = useState(getToken());

	function saveToken(userToken) {
		localStorage.setItem('spacePortalToken', userToken);
		setToken(userToken);
	}

	function removeToken() {
		localStorage.removeItem('spacePortalToken');
		setToken(null);
	}

	return {
		setToken: saveToken,
		token,
		removeToken,
	};
}

export default useToken;

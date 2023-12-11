import { Outlet, Navigate } from 'react-router-dom';
import useToken from '../lib/useToken';

const PrivateRoutes = () => {
	let token = useToken();
	token = true; // hard code this for the moment.
	return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;

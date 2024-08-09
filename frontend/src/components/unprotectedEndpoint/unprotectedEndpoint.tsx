import { useUnprotectedEndpointQuery } from '../../store/mainApi';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const UnprotectedEndpoint = () => {
	const { data, error, isLoading, refetch } = useUnprotectedEndpointQuery();
	const location = useLocation();

	useEffect(() => {
		console.log(location.pathname);
	}, [location]);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div className="m-2 mb-4">
			<h1 className="font-bold">Unprotected Page</h1>
			<div>{data?.message}</div>
		</div>
	);
};

export default UnprotectedEndpoint;

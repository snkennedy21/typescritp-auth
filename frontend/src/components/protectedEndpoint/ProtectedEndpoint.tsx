import { useProtectedEndpointQuery } from '../../store/mainApi';

const TestAuth = () => {
	const { data, error, isLoading } = useProtectedEndpointQuery();

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div className="m-2 mb-4">
			<h1 className="font-bold">Protected Page</h1>
			{error ? <div>{error.data.error}</div> : <div>{data.message}</div>}
		</div>
	);
};

export default TestAuth;

import { useState } from 'react';

const Home = () => {
	const [name, setName] = useState('Starting');

	return (
		<div>
			<h1 className="font-bold">Home</h1>
			<section className="">
				<button onClick={() => setName('Banana')}>Click Me</button>
				<div>{name}</div>
			</section>
		</div>
	);
};

export default Home;

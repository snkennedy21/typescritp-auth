import React from 'react';

// Define the type for each lifecycle phase
interface LifecyclePhase {
	title: string;
	description: string;
}

// Define the props interface
interface LifecycleListProps {
	title: string;
	phases: LifecyclePhase[];
}

const LifecycleList: React.FC<LifecycleListProps> = ({ title, phases }) => {
	return (
		<section className="mt-10 px-4 mx-auto">
			<h2 className="text-xl font-semibold mb-2">{title}</h2>
			<ul className="list-disc list-outside pl-6 mb-4 space-y-2">
				{phases.map((phase, index) => (
					<li key={index}>
						<strong>{phase.title}:</strong> {phase.description}
					</li>
				))}
			</ul>
		</section>
	);
};

export default LifecycleList;

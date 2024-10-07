import React from 'react';

// Define the type for each feature object
interface Feature {
	title: string;
	description: string;
}

// Define the props interface
interface FeatureListProps {
	title: string;
	features: Feature[];
}

const FeatureList: React.FC<FeatureListProps> = ({ title, features }) => {
	return (
		<section className="mt-10 px-4 mx-auto">
			<h2 className="text-xl font-semibold mb-2">{title}</h2>
			<ul className="list-disc list-outside pl-6 mb-4 space-y-2">
				{features.map((feature, index) => (
					<li key={index}>
						<strong>{feature.title}:</strong> {feature.description}
					</li>
				))}
			</ul>
		</section>
	);
};

export default FeatureList;

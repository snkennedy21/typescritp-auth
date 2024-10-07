import React, { ReactNode } from 'react';

// Define prop types using a TypeScript interface
interface InfoSectionProps {
	title: string;
	children: ReactNode;
}

const InfoSection: React.FC<InfoSectionProps> = ({ title, children }) => {
	return (
		<section className="mt-10 px-4 mx-auto">
			<h1 className="text-[42px] font-bold">{title}</h1>
			{children}
		</section>
	);
};

export default InfoSection;

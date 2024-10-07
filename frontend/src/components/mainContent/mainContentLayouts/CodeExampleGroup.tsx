import React from 'react';
import CodeBlock from '../../codeblockExample/CodeblockExample';

// Define the type for each code example
interface CodeExample {
	heading: string;
	language: string;
	code: string;
}

// Define the props interface
interface CodeExampleGroupProps {
	title: string;
	examples: CodeExample[];
}

const CodeExampleGroup: React.FC<CodeExampleGroupProps> = ({
	title,
	examples,
}) => {
	return (
		<section className="mt-12">
			<h2 className="text-2xl font-bold mb-2">{title}</h2>
			{examples.map((example, index) => (
				<div key={index} className="mb-6">
					<h3 className="text-lg">{example.heading}</h3>
					<CodeBlock language={example.language}>
						{example.code}
					</CodeBlock>
				</div>
			))}
		</section>
	);
};

export default CodeExampleGroup;

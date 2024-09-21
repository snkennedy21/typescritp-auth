import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import copyToClipboard from 'copy-to-clipboard';

type CodeBlockProps = {
	language: string;
	children: string;
};

const CodeBlock: React.FC<CodeBlockProps> = ({ language, children }) => {
	const [copied, setCopied] = useState(false);

	const handleCopy = () => {
		copyToClipboard(children);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
	};

	return (
		<div style={{ position: 'relative' }}>
			{/* SyntaxHighlighter for displaying the code */}
			<div className="bg-gray-500 h-8 w-full -mb-2"></div>
			<SyntaxHighlighter language={language} style={darcula}>
				{children}
			</SyntaxHighlighter>

			{/* Copy button */}
			<button
				onClick={handleCopy}
				style={{
					position: 'absolute',
					top: '5px',
					right: '10px',
					border: 'none',
					cursor: 'pointer',
					color: 'white',
				}}
			>
				{copied ? <div>COPIED</div> : <div>COPY</div>}
			</button>
		</div>
	);
};

export default CodeBlock;

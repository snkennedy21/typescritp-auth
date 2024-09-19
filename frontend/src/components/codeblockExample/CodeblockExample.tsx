import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import copyToClipboard from 'copy-to-clipboard';

type CodeBlockProps = {
	language: string;
	code: string;
};

const CodeBlock: React.FC<CodeBlockProps> = ({ language, code }) => {
	const [copied, setCopied] = useState(false);

	const handleCopy = () => {
		copyToClipboard(code);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
	};

	return (
		<div style={{ position: 'relative', marginBottom: '1rem' }}>
			{/* SyntaxHighlighter for displaying the code */}
			<SyntaxHighlighter language={language} style={darcula}>
				{code}
			</SyntaxHighlighter>

			{/* Copy button */}
			<button
				onClick={handleCopy}
				style={{
					position: 'absolute',
					top: '10px',
					right: '10px',
					background: 'transparent',
					border: 'none',
					cursor: 'pointer',
					color: copied ? 'green' : 'gray',
				}}
			>
				{copied ? <div>COPIED</div> : <div>COPY</div>}
			</button>
		</div>
	);
};

export default CodeBlock;

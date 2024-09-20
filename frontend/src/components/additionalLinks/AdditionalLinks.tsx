import '@fortawesome/fontawesome-free/css/all.min.css';

function AdditionalLinks() {
	return (
		<div className="p-2 h-full border-l border-gray-300">
			<h2 className="text-xl font-bold">Social Links</h2>
			<ul>
				<li className="my-2">
					<a
						href="https://www.linkedin.com/in/sean-kennedy-208b48232/"
						target="_blank"
						className="flex items-center gap-2 hover:text-blue-400 transition duration-100"
					>
						<i className="fab fa-linkedin"></i>
						<span>LinkedIn</span>
					</a>
				</li>
				<li className="my-2">
					<a
						href="https://github.com/snkennedy21"
						target="_blank"
						className="flex items-center gap-2 hover:text-blue-400 transition duration-100"
					>
						<i className="fab fa-github"></i>
						<span>Github</span>
					</a>
				</li>
			</ul>
		</div>
	);
}

export default AdditionalLinks;

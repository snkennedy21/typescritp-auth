const VariablesSection = () => {
	return (
		<section className="mt-10 px-4 mx-auto">
			<h1 className="text-[42px] font-bold">Kubernetes Variables</h1>
			<p className="text-xl mb-6">
				Kubernetes offers multiple ways to manage variables within
				applications. Understanding the different types of
				variables—Environment Variables, ConfigMaps, and Secrets—helps
				keep applications secure, configurable, and easy to maintain.
			</p>

			{/* Environment Variables Section */}
			<h2 className="text-2xl font-bold mb-4">Environment Variables</h2>
			<p className="text-lg mb-2">
				Environment variables are used to pass dynamic values to
				applications running inside containers. They can be defined in
				pod specifications or referenced from other resources such as
				ConfigMaps and Secrets.
			</p>
			<ul className="list-disc list-outside pl-6 mb-4 space-y-2">
				<li>
					<strong>Usage:</strong> Environment variables are commonly
					used to configure settings like application modes, paths,
					and external service endpoints.
				</li>
				<li>
					<strong>Reference:</strong> You can reference values from
					ConfigMaps and Secrets directly in pod environment
					variables.
				</li>
				<li>
					<strong>Scope:</strong> These variables are scoped to the
					container and only available during the lifecycle of the
					container.
				</li>
			</ul>

			{/* ConfigMaps Section */}
			<h2 className="text-2xl font-bold mb-4">ConfigMaps</h2>
			<p className="text-lg mb-2">
				ConfigMaps are key-value pairs that can be used to store
				non-sensitive configuration data separately from application
				code. They allow you to externalize configuration and keep
				application settings flexible.
			</p>
			<ul className="list-disc list-outside pl-6 mb-4 space-y-2">
				<li>
					<strong>Data Storage:</strong> ConfigMaps can store
					environment variables, configuration files, and command-line
					arguments.
				</li>
				<li>
					<strong>Usage:</strong> ConfigMaps can be used to inject
					configuration data into containers as environment variables
					or mount them as files.
				</li>
				<li>
					<strong>Best Practice:</strong> Use ConfigMaps for
					non-sensitive data. For credentials or secrets, use Secrets.
				</li>
			</ul>

			{/* Secrets Section */}
			<h2 className="text-2xl font-bold mb-4">Secrets</h2>
			<p className="text-lg mb-2">
				Secrets are used to store sensitive information such as
				passwords, access tokens, and keys. They provide a secure way to
				manage sensitive configuration data in Kubernetes, keeping it
				separate from application code.
			</p>
			<ul className="list-disc list-outside pl-6 mb-4 space-y-2">
				<li>
					<strong>Data Security:</strong> Secrets are base64-encoded
					and can be referenced securely by applications.
				</li>
				<li>
					<strong>Encryption:</strong> Kubernetes can encrypt Secrets
					at rest using encryption providers, adding an additional
					layer of security.
				</li>
				<li>
					<strong>Usage:</strong> Secrets can be injected into pods as
					environment variables or mounted as files, similar to
					ConfigMaps.
				</li>
			</ul>

			{/* Summary Section */}
			<h2 className="text-xl font-semibold mb-2">Summary:</h2>
			<p className="text-lg">
				Kubernetes provides flexible options for managing application
				configuration and sensitive data. Environment Variables are
				ideal for dynamic container-specific values. ConfigMaps are best
				for non-sensitive configuration data, while Secrets offer a
				secure way to manage sensitive information. Choosing the right
				type of variable ensures security and maintainability of your
				applications.
			</p>
		</section>
	);
};

export default VariablesSection;

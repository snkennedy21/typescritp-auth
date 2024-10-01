const ConfigMapsSection = () => {
	return (
		<section className="mt-10 px-4 mx-auto">
			<h1 className="text-[42px] font-bold">ConfigMaps</h1>

			<p className="text-xl">
				A ConfigMap in Kubernetes is a way to manage configuration data
				separately from application code. It allows you to decouple
				environment-specific configurations from your containerized
				applications, making them easier to update and manage.
			</p>

			{/* <img
				src={configMapPicture}
				alt="ConfigMap Illustration"
				className="w-2/3 mx-auto"
			/> */}

			<h2 className="text-xl font-semibold mb-2">
				Understanding ConfigMaps:
			</h2>

			<ul className="list-disc list-outside pl-6 mb-4 space-y-2">
				<li>
					<strong>Decoupled Configuration:</strong> ConfigMaps allow
					you to separate your application configuration from your
					application's code, making it easier to maintain.
				</li>
				<li>
					<strong>Environment Management:</strong> They enable you to
					store configuration values such as environment variables,
					command-line arguments, and application settings.
				</li>
			</ul>

			<h2 className="text-xl font-semibold mb-2">Key Features:</h2>

			<ul className="list-disc list-outside pl-6 mb-4 space-y-2">
				<li>
					<strong>Environment Variables:</strong> ConfigMaps can be
					used to inject environment variables into pods.
				</li>
				<li>
					<strong>Mount as Files:</strong> They can also be mounted as
					configuration files inside containers, making it easy to
					manage settings without modifying code.
				</li>
				<li>
					<strong>Dynamic Updates:</strong> ConfigMaps can be updated
					dynamically without rebuilding your container images, making
					them ideal for managing non-sensitive configurations.
				</li>
			</ul>

			<h2 className="text-xl font-semibold mb-2">How ConfigMaps Work:</h2>

			<ol className="list-decimal list-outside pl-6 mb-4 space-y-2">
				<li>
					<strong>Creation:</strong> A ConfigMap is defined in a YAML
					file or created using the `kubectl create configmap`
					command. It stores key-value pairs that can be referenced by
					pods.
				</li>
				<li>
					<strong>Injection:</strong> Pods can use ConfigMaps to
					inject environment variables or mount configuration files.
				</li>
				<li>
					<strong>Referencing:</strong> ConfigMaps are referenced in
					pod specifications to provide configuration data without
					hardcoding values.
				</li>
			</ol>

			<h2 className="text-xl font-semibold mb-2">ConfigMap Lifecycle:</h2>

			<ul className="list-disc list-outside pl-6 mb-4 space-y-2">
				<li>
					<strong>Creation:</strong> ConfigMaps can be created from
					configuration files or directly from key-value pairs using
					Kubernetes commands.
				</li>
				<li>
					<strong>Updating:</strong> ConfigMaps can be updated without
					restarting the associated pods, as long as they are mounted
					as files.
				</li>
				<li>
					<strong>Deletion:</strong> ConfigMaps can be safely deleted
					without impacting running pods unless they are actively
					being used.
				</li>
			</ul>

			<h2 className="text-xl font-semibold mb-2">Usage Scenarios:</h2>

			<ul className="list-disc list-outside pl-6 mb-4 space-y-2">
				<li>
					<strong>Storing Configuration:</strong> Use ConfigMaps to
					store configuration details, such as external service URLs
					or database connection strings.
				</li>
				<li>
					<strong>Environment Variables:</strong> Inject environment
					variables into containers for flexible application
					configuration.
				</li>
				<li>
					<strong>Configuration Files:</strong> Mount configuration
					files like `.env` or other custom files into containers.
				</li>
			</ul>

			<h2 className="text-xl font-semibold mb-2">Best Practices:</h2>

			<ul className="list-disc list-outside pl-6 mb-4 space-y-2">
				<li>
					<strong>Separate Configuration:</strong> Keep ConfigMaps
					separate from sensitive data like credentials, which should
					be stored in Secrets.
				</li>
				<li>
					<strong>Version Control:</strong> Use versioning to track
					changes to your ConfigMaps and ensure you can roll back to
					previous versions if needed.
				</li>
				<li>
					<strong>Avoid Large ConfigMaps:</strong> Keep ConfigMaps
					small to avoid large memory consumption and to simplify
					management.
				</li>
			</ul>

			<h2 className="text-xl font-semibold mb-2">Summary:</h2>

			<p>
				ConfigMaps are a versatile way to manage non-sensitive
				configuration data in Kubernetes. They provide a mechanism to
				separate configuration from code, making it easier to update and
				manage applications. Whether injecting environment variables or
				mounting configuration files, ConfigMaps play a critical role in
				Kubernetes-based applications.
			</p>
		</section>
	);
};

export default ConfigMapsSection;

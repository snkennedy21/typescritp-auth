const SecretsSection = () => {
	return (
		<section className="mt-10 px-4 mx-auto">
			<h1 className="text-[42px] font-bold">Secrets in Kubernetes</h1>
			<p className="text-xl mb-6">
				A Secret in Kubernetes is an object that contains sensitive data
				such as passwords, tokens, or keys. Secrets are similar to
				ConfigMaps but are used specifically for sensitive information,
				and Kubernetes provides additional mechanisms for securing them.
			</p>

			<h2 className="text-2xl font-bold mb-2">Key Features:</h2>
			<ul className="list-disc list-outside pl-6 mb-4 space-y-2">
				<li>
					<strong>Data Security:</strong> Secrets can be used to store
					sensitive configuration data, which is base64-encoded to add
					an additional layer of protection.
				</li>
				<li>
					<strong>Encryption Support:</strong> Kubernetes supports
					encryption of Secrets at rest, providing enhanced security.
				</li>
				<li>
					<strong>Flexible Usage:</strong> Secrets can be used as
					environment variables, mounted as files, or referenced
					directly in container specifications.
				</li>
			</ul>

			<h2 className="text-2xl font-bold mb-2">Usage Scenarios:</h2>
			<ul className="list-disc list-outside pl-6 mb-4 space-y-2">
				<li>
					<strong>Storing Credentials:</strong> Use Secrets to
					securely store passwords, API tokens, and SSH keys.
				</li>
				<li>
					<strong>Encrypting Configuration Data:</strong> Encrypt
					sensitive configuration data that should not be stored in
					plain text.
				</li>
				<li>
					<strong>Secure Access:</strong> Use Secrets to provide
					sensitive data safely to containers without exposing it in
					plain text configurations.
				</li>
			</ul>

			<h2 className="text-2xl font-bold mb-2">Best Practices:</h2>
			<ul className="list-disc list-outside pl-6 mb-4 space-y-2">
				<li>
					<strong>Limit Access:</strong> Restrict access to Secrets to
					only necessary services and components.
				</li>
				<li>
					<strong>Avoid Inline Secrets:</strong> Never store sensitive
					information directly in pod specifications. Use Secrets
					instead.
				</li>
				<li>
					<strong>Monitor and Rotate:</strong> Regularly monitor and
					rotate Secrets to reduce the risk of compromise.
				</li>
			</ul>

			<h2 className="text-2xl font-bold mb-2">Summary:</h2>
			<p className="text-lg">
				Kubernetes Secrets provide a secure way to manage sensitive
				data, separating it from application code and configurations.
				Using Secrets properly ensures security and maintainability of
				sensitive information in Kubernetes-based applications.
			</p>
		</section>
	);
};

export default SecretsSection;

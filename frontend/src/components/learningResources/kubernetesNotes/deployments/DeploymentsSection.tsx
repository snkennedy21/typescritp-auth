const DeploymentSection = () => {
	return (
		<section className="mt-10 px-4 mx-auto">
			<h1 className="text-[42px] font-bold">Deployments</h1>

			<p className="text-xl">
				A Deployment in Kubernetes automates the process of updating and
				managing applications at scale. It manages the deployment of
				ReplicaSets and ensures that the desired state of your
				application is maintained, even as updates are applied.
			</p>

			<h2 className="text-xl font-semibold mb-2">
				Understanding Deployments:
			</h2>

			<ul className="list-disc list-outside pl-6 mb-4 space-y-2">
				<li>
					<strong>Declarative Updates:</strong> A Deployment allows
					you to declare the desired state of your application,
					including the number of replicas, and Kubernetes will
					automatically bring your application to that state.
				</li>
				<li>
					<strong>Version Control:</strong> Deployments track the
					history of updates and provide the ability to rollback to
					previous versions if something goes wrong.
				</li>
			</ul>

			<h2 className="text-xl font-semibold mb-2">Key Features:</h2>

			<ul className="list-disc list-outside pl-6 mb-4 space-y-2">
				<li>
					<strong>Rolling Updates:</strong> Deployments ensure that
					new updates are rolled out gradually, replacing old pods
					with new ones without causing downtime.
				</li>
				<li>
					<strong>Rollback:</strong> In case of an issue, a Deployment
					allows for an easy rollback to a previous stable state.
				</li>
				<li>
					<strong>Scaling:</strong> Like ReplicaSets, Deployments
					allow you to easily scale your application up or down by
					adjusting the number of replicas.
				</li>
			</ul>

			<h2 className="text-xl font-semibold mb-2">
				How Deployments Work:
			</h2>

			<ol className="list-decimal list-outside pl-6 mb-4 space-y-2">
				<li>
					<strong>Definition:</strong> A Deployment is defined in a
					YAML file, specifying the desired state of the application,
					such as the replica count and the container image.
				</li>
				<li>
					<strong>Rolling Updates:</strong> When updating an
					application, the Deployment replaces old pods with new ones
					in a controlled manner.
				</li>
				<li>
					<strong>Monitoring:</strong> The Deployment controller
					continuously monitors the pods' status and ensures that the
					desired state is maintained.
				</li>
			</ol>

			<h2 className="text-xl font-semibold mb-2">
				Deployment Lifecycle:
			</h2>

			<ul className="list-disc list-outside pl-6 mb-4 space-y-2">
				<li>
					<strong>Creation:</strong> A Deployment is created by
					defining it in a YAML file or using the Kubernetes API.
				</li>
				<li>
					<strong>Updating:</strong> A Deployment can be updated to
					release a new version of the application, and Kubernetes
					handles the transition smoothly.
				</li>
				<li>
					<strong>Scaling:</strong> The Deployment automatically
					manages the scaling of the application by creating or
					removing pods based on demand.
				</li>
				<li>
					<strong>Rollback:</strong> If a new version fails,
					Kubernetes can automatically or manually roll back the
					application to a previous stable state.
				</li>
			</ul>

			<h2 className="text-xl font-semibold mb-2">Usage Scenarios:</h2>

			<ul className="list-disc list-outside pl-6 mb-4 space-y-2">
				<li>
					<strong>Rolling Updates:</strong> Ensuring that an
					application is updated without downtime by gradually
					replacing old pods with new ones.
				</li>
				<li>
					<strong>Version Control:</strong> Maintaining a history of
					updates, making it easy to roll back to previous versions if
					needed.
				</li>
				<li>
					<strong>Scaling:</strong> Adjusting the replica count to
					manage traffic spikes or reduce resource usage when demand
					is lower.
				</li>
			</ul>

			<h2 className="text-xl font-semibold mb-2">Summary:</h2>

			<p>
				Deployments in Kubernetes are a powerful tool for managing
				application updates, scaling, and ensuring high availability.
				They provide automatic rollouts, rollbacks, and the ability to
				track version history, making them essential for maintaining
				reliable and scalable applications.
			</p>
		</section>
	);
};

export default DeploymentSection;

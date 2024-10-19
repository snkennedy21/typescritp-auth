const ReplicaSetSection = () => {
	return (
		<section className="mt-10 px-4 mx-auto">
			<h1 className="text-[42px] font-bold">ReplicaSets</h1>

			<p className="text-xl">
				A ReplicaSet ensures that a specified number of pod replicas are
				running at any given time in a Kubernetes cluster. It is used to
				maintain the desired number of pod copies to ensure availability
				and reliability.
			</p>

			<h2 className="text-xl font-semibold mb-2">
				Understanding ReplicaSets:
			</h2>

			<ul className="list-disc list-outside pl-6 mb-4 space-y-2">
				<li>
					<strong>Maintaining Pod Availability:</strong> A ReplicaSet
					makes sure that the specified number of identical pods are
					always running. If a pod fails or is terminated, the
					ReplicaSet replaces it with a new one.
				</li>
				<li>
					<strong>Scaling:</strong> ReplicaSets can easily scale the
					number of running pods by adjusting the replica count in the
					ReplicaSet definition, either up or down based on the
					application's needs.
				</li>
			</ul>

			<h2 className="text-xl font-semibold mb-2">Key Features:</h2>

			<ul className="list-disc list-outside pl-6 mb-4 space-y-2">
				<li>
					<strong>Pod Replacement:</strong> If a pod goes down, the
					ReplicaSet controller automatically launches a new one to
					maintain the desired number of replicas.
				</li>
				<li>
					<strong>Label Matching:</strong> ReplicaSets use labels to
					track which pods belong to them. It selects the pods based
					on a set of label selectors to manage their lifecycle.
				</li>
				<li>
					<strong>Self-Healing:</strong> ReplicaSets help ensure
					application reliability by maintaining the expected pod
					count and replacing failed pods as needed.
				</li>
			</ul>

			<h2 className="text-xl font-semibold mb-2">
				How ReplicaSets Work:
			</h2>

			<ol className="list-decimal list-outside pl-6 mb-4 space-y-2">
				<li>
					<strong>Definition:</strong> A ReplicaSet is defined in a
					YAML file, specifying the desired number of replicas, the
					pod template, and label selectors.
				</li>
				<li>
					<strong>Monitoring:</strong> The ReplicaSet controller
					continuously monitors the status of the pods it manages.
				</li>
				<li>
					<strong>Scaling:</strong> By updating the replica count in
					the ReplicaSet, Kubernetes either adds or removes pods to
					match the desired state.
				</li>
			</ol>

			<h2 className="text-xl font-semibold mb-2">
				ReplicaSet Lifecycle:
			</h2>

			<ul className="list-disc list-outside pl-6 mb-4 space-y-2">
				<li>
					<strong>Creation:</strong> A ReplicaSet is created either
					manually or through higher-level controllers like
					Deployments.
				</li>
				<li>
					<strong>Running:</strong> Once created, the ReplicaSet
					ensures the defined number of pod replicas are running.
				</li>
				<li>
					<strong>Scaling:</strong> ReplicaSets can be scaled either
					manually or automatically to handle increases or decreases
					in demand.
				</li>
				<li>
					<strong>Deletion:</strong> Deleting a ReplicaSet does not
					automatically delete the pods it manages. However, if
					desired, the pods can be removed along with the ReplicaSet.
				</li>
			</ul>

			<h2 className="text-xl font-semibold mb-2">Usage Scenarios:</h2>

			<ul className="list-disc list-outside pl-6 mb-4 space-y-2">
				<li>
					<strong>High Availability:</strong> Ensuring that multiple
					replicas of an application are running across different
					nodes in the cluster to prevent downtime.
				</li>
				<li>
					<strong>Load Balancing:</strong> Using multiple replicas of
					the same pod to distribute load evenly across the cluster.
				</li>
				<li>
					<strong>Scaling:</strong> Adjusting the replica count based
					on application demand, either automatically or manually.
				</li>
			</ul>

			<h2 className="text-xl font-semibold mb-2">Summary:</h2>

			<p>
				ReplicaSets play a critical role in Kubernetes by ensuring that
				the specified number of pod replicas are running at all times.
				They offer scaling, self-healing, and high availability for
				containerized applications, making them essential for reliable
				and scalable deployment strategies.
			</p>
		</section>
	);
};

export default ReplicaSetSection;

import React from 'react';

const ResourcesSection = () => {
	return (
		<section className="mt-10 px-4 mx-auto">
			<h1 className="text-[42px] font-bold">Resource Management</h1>

			<p className="text-xl">
				In Kubernetes, resource management is essential for ensuring
				optimal performance and stability of your applications. Proper
				use of resource requests, limits, and quotas helps prevent
				resource contention and enables efficient scaling.
			</p>

			<h2 className="text-xl font-semibold mb-2">
				Understanding Resources:
			</h2>

			<ul className="list-disc list-outside pl-6 mb-4 space-y-2">
				<li>
					<strong>Requests:</strong> The minimum amount of resources
					(such as CPU or memory) a container needs to run. Kubernetes
					uses this information to decide on scheduling.
				</li>
				<li>
					<strong>Limits:</strong> The maximum amount of resources a
					container can use. If a container tries to exceed this
					limit, Kubernetes throttles its usage.
				</li>
				<li>
					<strong>Quotas:</strong> Restrictions placed on the amount
					of resources that can be used by a namespace. These limits
					help allocate resources fairly across teams or projects.
				</li>
			</ul>

			<h2 className="text-xl font-semibold mb-2">Key Features:</h2>

			<ul className="list-disc list-outside pl-6 mb-4 space-y-2">
				<li>
					<strong>Resource Requests:</strong> Define the baseline
					amount of resources required for a container. A container
					will not be scheduled if the node cannot meet its requested
					resources.
				</li>
				<li>
					<strong>Resource Limits:</strong> Prevent a single container
					from consuming too many resources, which could impact other
					containers.
				</li>
				<li>
					<strong>Quotas:</strong> Allow administrators to control the
					resource usage within a namespace, ensuring a balanced
					environment.
				</li>
			</ul>

			<h2 className="text-xl font-semibold mb-2">Usage Scenarios:</h2>

			<ul className="list-disc list-outside pl-6 mb-4 space-y-2">
				<li>
					<strong>Application Stability:</strong> Setting limits
					prevents individual containers from monopolizing resources,
					ensuring a more stable environment.
				</li>
				<li>
					<strong>Fair Resource Allocation:</strong> Resource quotas
					prevent excessive usage by a single namespace, promoting
					fair sharing of cluster resources.
				</li>
				<li>
					<strong>Cost Management:</strong> Proper use of requests,
					limits, and quotas helps in planning and controlling costs
					when running Kubernetes on cloud environments.
				</li>
			</ul>

			<h2 className="text-xl font-semibold mb-2">Summary:</h2>

			<p>
				Understanding resource requests, limits, and quotas is crucial
				for optimizing Kubernetes deployments. By setting appropriate
				values, teams can ensure efficient usage, better application
				performance, and balanced workloads across the cluster.
			</p>
		</section>
	);
};

export default ResourcesSection;

import kubernetesArchitechture from '../../../../assets/components-of-kubernetes.svg';

const KubernetesSection = () => {
	return (
		<section className="mt-10 px-4 mx-auto">
			<h1 className="text-[42px] font-bold">Kubernetes</h1>
			<p className="text-xl">
				Kubernetes is an open source container orchestration engine for
				automating deployment, scaling, and management of containerized
				applications.
			</p>
			<img src={kubernetesArchitechture} alt="picture" />
			<h1 className="text-2xl font-bold mb-4">
				Kubernetes Architecture Summary
			</h1>

			<p className="mb-4">
				Kubernetes is an open-source platform designed to automate
				deploying, scaling, and operating containerized applications. It
				orchestrates clusters of virtual machines and schedules
				containers to run on those virtual machines based on their
				resource requirements and availability.
			</p>

			<h2 className="text-xl font-semibold mb-2">
				Architecture Overview:
			</h2>

			<p className="mb-4">
				Kubernetes follows a master-slave architecture, consisting of a
				control plane (master node) and worker nodes.
			</p>

			<ol className="list-decimal list-outside pl-6 mb-4 space-y-2">
				<li>
					<strong>Control Plane (Master Node):</strong>
					<ul className="list-disc list-outside pl-6 space-y-1 mt-2">
						<li>
							<strong>API Server:</strong> Serves as the
							front-end, handling all RESTful API requests to
							manage the cluster.
						</li>
						<li>
							<strong>etcd:</strong> A distributed key-value store
							that holds the cluster's state and configuration
							data.
						</li>
						<li>
							<strong>Scheduler:</strong> Assigns workloads to
							nodes based on resource availability and policies.
						</li>
						<li>
							<strong>Controller Manager:</strong> Runs controller
							processes that handle routine tasks, such as
							replicating pods and managing nodes.
						</li>
					</ul>
				</li>
				<li>
					<strong>Worker Nodes:</strong>
					<ul className="list-disc list-outside pl-6 space-y-1 mt-2">
						<li>
							<strong>Kubelet:</strong> An agent that ensures
							containers are running in a pod on a node.
						</li>
						<li>
							<strong>Kube-proxy:</strong> Manages network routing
							and load balancing for services on that node.
						</li>
						<li>
							<strong>Container Runtime:</strong> Software like
							Docker or containerd that runs the containers.
						</li>
					</ul>
				</li>
			</ol>

			<h2 className="text-xl font-semibold mb-2">How It Works:</h2>

			<ul className="list-disc list-outside pl-6 mb-4 space-y-1">
				<li>
					<strong>Deployment:</strong> Users define application
					deployment configurations using YAML or JSON files,
					specifying desired states such as container images,
					replicas, and networking.
				</li>
				<li>
					<strong>Scheduling:</strong> The Scheduler places pods onto
					suitable nodes based on resource requirements and
					constraints.
				</li>
				<li>
					<strong>Execution:</strong> The Kubelet on each worker node
					communicates with the control plane to maintain the desired
					state, starting or stopping containers as needed.
				</li>
				<li>
					<strong>Networking:</strong> Kube-proxy ensures seamless
					communication within the cluster and manages service
					discovery.
				</li>
				<li>
					<strong>Scaling and Healing:</strong> Kubernetes
					automatically scales applications based on load and replaces
					failed containers to maintain the desired state.
				</li>
			</ul>

			<h2 className="text-xl font-semibold mb-2">Key Features:</h2>

			<ul className="list-disc list-outside pl-6 mb-4 space-y-1">
				<li>
					<strong>Automated Rollouts and Rollbacks:</strong> Gradually
					roll out changes and roll back if issues are detected.
				</li>
				<li>
					<strong>Service Discovery and Load Balancing:</strong>{' '}
					Exposes services using DNS names or IP addresses and
					balances network traffic.
				</li>
				<li>
					<strong>Storage Orchestration:</strong> Automatically mounts
					the storage system of your choice.
				</li>
				<li>
					<strong>Self-Healing:</strong> Restarts failed containers
					and replaces nodes when necessary.
				</li>
			</ul>

			<h2 className="text-xl font-semibold mb-2">Summary:</h2>

			<p>
				Kubernetes provides a robust framework for running distributed
				systems resiliently. It handles the complexities of scaling and
				managing containers, allowing developers to focus on application
				development rather than infrastructure management.
			</p>
		</section>
	);
};

export default KubernetesSection;

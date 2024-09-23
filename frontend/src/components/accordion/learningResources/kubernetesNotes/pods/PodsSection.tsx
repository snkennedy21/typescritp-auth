import podsPicture from '../../../../../assets/podsPicture.png';

const PodsSection = () => {
	return (
		<section className="mt-10 px-4 mx-auto">
			<h1 className="text-[42px] font-bold">Pods</h1>

			<p className="text-xl">
				A pod is the smallest and most basic deployable unit in
				Kubernetes. It represents a single instance of a running process
				in your cluster and can contain one or more tightly coupled
				containers that share the same resources and network namespace.
			</p>

			<img src={podsPicture} alt="picture" className="w-2/3 mx-auto" />

			<h2 className="text-xl font-semibold mb-2">Understanding Pods:</h2>

			<ul className="list-disc list-outside pl-6 mb-4 space-y-2">
				<li>
					<strong>Single Container Pods</strong> Most pods contain a
					single container, making it a wrapper around a single
					container.
				</li>
				<li>
					<strong>Multi-Container Pods</strong> Pods can also contain
					multiple containers that need to work closely together.
					These containers share storage and network resources and can
					communicate via inter-process communication (IPC).
				</li>
			</ul>

			<h2 className="text-xl font-semibold mb-2">Key Features:</h2>

			<ul className="list-disc list-outside pl-6 mb-4 space-y-2">
				<li>
					<strong>Shared Networking</strong> All containers in a pod
					share the same IP address and network namespace. They can
					communicate with each other using <code>localhost</code>.
				</li>
				<li>
					<strong>Shared Storage:</strong> Containers in a pod can
					access shared volumes, allowing them to share data.
				</li>
				<li>
					<strong>Lifecycle Management:</strong> Pods are mortal and
					are not durable entities. If a pod dies, it won't come back.
					Instead, Kubernetes replaces it with a new pod.
				</li>
			</ul>

			<h2 className="text-xl font-semibold mb-2">How Pods Work:</h2>

			<ol className="list-decimal list-outside pl-6 mb-4 space-y-2">
				<li>
					<strong>Creation:</strong> Pods are created by Kubernetes
					controllers like Deployments, ReplicaSets, or directly via
					the API.
				</li>
				<li>
					<strong>Scheduling:</strong> The Kubernetes Scheduler
					assigns the pod to a node based on resource requirements and
					policies.
				</li>
				<li>
					<strong>Execution:</strong> The Kubelet on the assigned node
					manages the pod's containers, ensuring they are running as
					specified.
				</li>
			</ol>

			<h2 className="text-xl font-semibold mb-2">Pod Lifecycle:</h2>

			<ul className="list-disc list-outside pl-6 mb-4 space-y-2">
				<li>
					<strong>Pending:</strong> The pod has been accepted by the
					cluster but one or more of its containers are not yet
					running.
				</li>
				<li>
					<strong>Running:</strong> The pod has been bound to a node
					and all containers have been created.
				</li>
				<li>
					<strong>Succeeded:</strong> All containers in the pod have
					terminated successfully.
				</li>
				<li>
					<strong>Failed:</strong> All containers in the pod have
					terminated, and at least one container terminated with a
					failure.
				</li>
				<li>
					<strong>Unknown:</strong> The state of the pod could not be
					obtained, typically due to a communication error.
				</li>
			</ul>

			<h2 className="text-xl font-semibold mb-2">Usage Scenarios:</h2>

			<ul className="list-disc list-outside pl-6 mb-4 space-y-2">
				<li>
					<strong>Sidecar Containers:</strong> Using a secondary
					container to support the main container, such as logging or
					monitoring agents.
				</li>
				<li>
					<strong>Adapter Containers:</strong> Transforming or
					modifying output for compatibility with other systems.
				</li>
				<li>
					<strong>Ambassador Containers:</strong> Proxying
					communications to and from the main container.
				</li>
			</ul>

			<h2 className="text-xl font-semibold mb-2">Summary:</h2>

			<p>
				Pods are fundamental to the Kubernetes architecture, serving as
				the unit of deployment and scaling. They encapsulate one or more
				containers, networking, and storage resources, enabling
				efficient management and orchestration of containerized
				applications.
			</p>
		</section>
	);
};

export default PodsSection;

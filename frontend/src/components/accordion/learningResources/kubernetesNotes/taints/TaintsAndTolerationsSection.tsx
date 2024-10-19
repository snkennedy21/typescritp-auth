const TaintsAndTolerationsSection = () => {
	return (
		<section className="mt-10 px-4 mx-auto">
			<h1 className="text-[42px] font-bold">Taints and Tolerations</h1>

			<p className="text-xl">
				Taints and tolerations are mechanisms in Kubernetes used to
				control which pods can be scheduled on which nodes. Taints allow
				a node to repel a set of pods, while tolerations allow certain
				pods to tolerate those taints and be scheduled on the node.
			</p>

			<h2 className="text-xl font-semibold mb-2">
				Understanding Taints:
			</h2>

			<ul className="list-disc list-outside pl-6 mb-4 space-y-2">
				<li>
					<strong>Taints:</strong> Taints are applied to nodes to
					prevent pods from being scheduled unless they have a
					corresponding toleration.
				</li>
				<li>
					<strong>Effect Types:</strong> Taints can have different
					effects such as <code>NoSchedule</code>,{' '}
					<code>PreferNoSchedule</code>, or <code>NoExecute</code> to
					control pod behavior.
				</li>
				<li>
					<strong>Use Cases:</strong> Taints can be used to reserve
					specific nodes for certain workloads or to prevent certain
					pods from being scheduled on sensitive nodes.
				</li>
			</ul>

			<h2 className="text-xl font-semibold mb-2">
				Understanding Tolerations:
			</h2>

			<ul className="list-disc list-outside pl-6 mb-4 space-y-2">
				<li>
					<strong>Tolerations:</strong> Pods can be configured with
					tolerations to allow them to be scheduled on nodes with
					specific taints.
				</li>
				<li>
					<strong>Flexible Scheduling:</strong> Tolerations provide
					flexibility for pods to ignore specific taints and still get
					scheduled on otherwise restricted nodes.
				</li>
				<li>
					<strong>Key-Value Matching:</strong> Tolerations match the
					key, value, and effect of taints, allowing pods to bypass
					restrictions based on these values.
				</li>
			</ul>

			<h2 className="text-xl font-semibold mb-2">
				How Taints and Tolerations Work:
			</h2>

			<ol className="list-decimal list-outside pl-6 mb-4 space-y-2">
				<li>
					<strong>Tainting Nodes:</strong> Taints are applied to nodes
					to control pod scheduling behavior.
				</li>
				<li>
					<strong>Tolerating Taints:</strong> Pods must declare
					tolerations in their specification to allow scheduling on
					tainted nodes.
				</li>
				<li>
					<strong>Enforcement:</strong> Pods that do not tolerate a
					node’s taints will not be scheduled on that node.
				</li>
			</ol>

			<h2 className="text-xl font-semibold mb-2">Usage Scenarios:</h2>

			<ul className="list-disc list-outside pl-6 mb-4 space-y-2">
				<li>
					<strong>Node Dedication:</strong> Use taints to dedicate
					certain nodes to high-priority workloads and prevent
					lower-priority pods from being scheduled there.
				</li>
				<li>
					<strong>Resource Protection:</strong> Taint nodes to prevent
					general workloads from overloading critical nodes.
				</li>
				<li>
					<strong>Cluster Segmentation:</strong> Use taints and
					tolerations to separate different environments (e.g.,
					production and development) within the same cluster.
				</li>
			</ul>

			<h2 className="text-xl font-semibold mb-2">Summary:</h2>

			<p>
				Taints and tolerations give Kubernetes administrators
				fine-grained control over pod scheduling. By using these
				mechanisms, you can optimize resource allocation, ensure proper
				workload isolation, and protect critical nodes from
				inappropriate workloads.
			</p>
		</section>
	);
};

export default TaintsAndTolerationsSection;

const SelectorsAndAffinitySection = () => {
	return (
		<section className="mt-10 px-4 mx-auto">
			<h1 className="text-[42px] font-bold">Selectors and Affinity</h1>

			<p className="text-xl">
				Kubernetes provides mechanisms like selectors and affinity to
				control which nodes or pods a workload should be scheduled on.
				These mechanisms help ensure that workloads are efficiently
				placed across the cluster while meeting requirements or
				preferences.
			</p>

			<h2 className="text-xl font-semibold mb-2">
				Understanding Selectors:
			</h2>

			<ul className="list-disc list-outside pl-6 mb-4 space-y-2">
				<li>
					<strong>Label Selectors:</strong> Selectors are used to
					match pods or nodes based on labels. They allow you to group
					resources based on key-value pairs.
				</li>
				<li>
					<strong>Match Expressions:</strong> In addition to simple
					key-value matches, Kubernetes supports more complex
					expressions that match against multiple conditions.
				</li>
				<li>
					<strong>Pod and Service Interaction:</strong> Label
					selectors are often used to associate services with the
					appropriate pods based on their labels.
				</li>
			</ul>

			<h2 className="text-xl font-semibold mb-2">
				Understanding Affinity:
			</h2>

			<ul className="list-disc list-outside pl-6 mb-4 space-y-2">
				<li>
					<strong>Node Affinity:</strong> Node affinity allows you to
					define rules for scheduling pods on specific nodes, based on
					node labels.
				</li>
				<li>
					<strong>Pod Affinity:</strong> Pod affinity defines rules
					for co-locating pods on the same node or topology as other
					pods based on labels.
				</li>
				<li>
					<strong>Pod Anti-Affinity:</strong> Pod anti-affinity
					ensures that certain pods are not scheduled on the same node
					or topology, enforcing separation.
				</li>
				<li>
					<strong>Required vs. Preferred Affinity:</strong>
					Affinity rules can either be required, meaning they must be
					met for scheduling, or preferred, meaning the scheduler will
					try to meet them but can choose other nodes if necessary.
					<code>
						preferredDuringSchedulingIgnoredDuringExecution
					</code>{' '}
					allows you to express preferences that the scheduler tries
					to honor but does not enforce strictly. This provides
					flexibility while optimizing placement.
				</li>
			</ul>

			<h2 className="text-xl font-semibold mb-2">
				How Selectors and Affinity Work:
			</h2>

			<ol className="list-decimal list-outside pl-6 mb-4 space-y-2">
				<li>
					<strong>Labeling Resources:</strong> Administrators apply
					labels to resources (pods or nodes) to organize and manage
					them.
				</li>
				<li>
					<strong>Scheduling with Selectors:</strong> Selectors match
					pods to nodes or services by comparing labels and selecting
					resources that meet the criteria.
				</li>
				<li>
					<strong>Affinity Rules:</strong> Affinity rules provide a
					way to prefer or require that pods be scheduled on specific
					nodes or in relation to other pods.
				</li>
			</ol>

			<h2 className="text-xl font-semibold mb-2">Usage Scenarios:</h2>

			<ul className="list-disc list-outside pl-6 mb-4 space-y-2">
				<li>
					<strong>Service Selection:</strong> Use label selectors to
					ensure services are only targeting the appropriate group of
					pods in your cluster.
				</li>
				<li>
					<strong>Pod Affinity:</strong> Co-locate tightly coupled
					pods on the same node to reduce network overhead and
					latency.
				</li>
				<li>
					<strong>Pod Anti-Affinity:</strong> Use anti-affinity rules
					to ensure pods are spread across different nodes for high
					availability.
				</li>
				<li>
					<strong>Node Preferences:</strong> Use{' '}
					<code>preferredDuringSchedulingIgnoredDuringExecution</code>{' '}
					to express preferences like co-location with other pods, but
					without strictly requiring it, allowing Kubernetes
					flexibility in scheduling.
				</li>
			</ul>

			<h2 className="text-xl font-semibold mb-2">Summary:</h2>

			<p>
				Selectors and affinity rules provide powerful tools to ensure
				efficient resource utilization and workload placement in
				Kubernetes. By using them effectively, you can fine-tune your
				cluster’s behavior and meet the specific needs of your
				applications.
			</p>
		</section>
	);
};

export default SelectorsAndAffinitySection;

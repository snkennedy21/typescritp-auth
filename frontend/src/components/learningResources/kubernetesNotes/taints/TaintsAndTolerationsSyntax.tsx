import CodeBlock from '../../../codeblockExample/CodeblockExample';

const TaintsAndTolerationsSyntax = () => {
	return (
		<section className="mt-10 px-4 mx-auto">
			<h1 className="text-[42px] font-bold">
				Taints and Tolerations Syntax
			</h1>
			<p className="text-xl">
				Below is the common syntax for applying taints to nodes and
				adding tolerations to pods in Kubernetes.
			</p>

			<h2 className="text-2xl font-bold mb-1 mt-12">Applying Taints:</h2>

			<h3 className="text-lg">Add a taint to a node</h3>
			<CodeBlock language="linux">
				{'kubectl taint nodes <node-name> key=value:effect'}
			</CodeBlock>

			<h3 className="text-lg">Remove a taint from a node</h3>
			<CodeBlock language="linux">
				{'kubectl taint nodes <node-name> key=value:effect-'}
			</CodeBlock>

			<h2 className="text-2xl font-bold mb-2 mt-12">
				Example: Tainting a Node
			</h2>

			<CodeBlock language="linux">
				{'kubectl taint nodes node1 dedicated=web:NoSchedule'}
			</CodeBlock>

			<h2 className="text-2xl font-bold mb-2 mt-12">
				Adding Tolerations to Pods:
			</h2>

			<h3 className="text-lg">YAML File</h3>
			<CodeBlock language="yaml">
				{`apiVersion: v1
kind: Pod
metadata:
  name: toleration-example
spec:
  containers:
  - name: nginx
    image: nginx
  tolerations:
  - key: "dedicated"
    operator: "Equal"
    value: "web"
    effect: "NoSchedule"
`}
			</CodeBlock>

			<h2 className="text-2xl font-bold mb-2 mt-12">Managing Taints:</h2>

			<h3 className="text-lg">Check node taints</h3>
			<CodeBlock language="linux">
				{'kubectl describe node <node-name>'}
			</CodeBlock>

			<h3 className="text-lg">Edit taints for a node</h3>
			<CodeBlock language="linux">
				{'kubectl edit node <node-name>'}
			</CodeBlock>

			<h2 className="text-2xl font-bold mb-2 mt-12">
				Debugging Taints and Tolerations:
			</h2>

			<h3 className="text-lg">View events related to taints</h3>
			<CodeBlock language="linux">{'kubectl get events'}</CodeBlock>

			<h3 className="text-lg">Get detailed information about a node</h3>
			<CodeBlock language="linux">
				{'kubectl describe node <node-name>'}
			</CodeBlock>
		</section>
	);
};

export default TaintsAndTolerationsSyntax;

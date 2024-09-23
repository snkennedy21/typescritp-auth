import CodeBlock from '../../../../codeblockExample/CodeblockExample';

const PodsCommandsSection = () => {
	return (
		<section className="mt-10 px-4 mx-auto">
			<h2 className="text-[42px] font-bold">Pod Commands</h2>
			<p className="text-xl">
				Common CLI commands for interacting with pods in Kubernetes.
			</p>

			<h2 className="text-2xl font-semibold mb-2 mt-6">Viewing Pods:</h2>

			<h3 className="text-lg">List all pods in the current namespace</h3>
			<CodeBlock language="linux">{'kubectl get pods'}</CodeBlock>

			<h3 className="text-lg">
				Get detailed information about a specific pod
			</h3>
			<CodeBlock language="linux">
				{'kubectl describe pod <pod-name>'}
			</CodeBlock>

			<h2 className="text-2xl font-semibold mb-2 mt-6">Managing Pods:</h2>

			<h3 className="text-lg">Delete a pod</h3>
			<CodeBlock language="linux">
				{'kubectl delete pod <pod-name>'}
			</CodeBlock>

			<h3 className="text-lg">
				Apply changes from a pod configuration file
			</h3>
			<CodeBlock language="linux">
				{'kubectl apply -f pod-definition.yaml'}
			</CodeBlock>

			<h3 className="text-lg">Edit a pod's configuration</h3>
			<CodeBlock language="linux">
				{'kubectl edit pod <pod-name>'}
			</CodeBlock>

			<h2 className="text-2xl font-semibold mb-2 mt-6">Debugging:</h2>

			<h3 className="text-lg">View logs of a pod</h3>
			<CodeBlock language="linux">{'kubectl logs <pod-name>'}</CodeBlock>

			<h3 className="text-lg">Get events related to pods </h3>
			<CodeBlock language="linux">{'kubectl get events'}</CodeBlock>

			<h3 className="text-lg">Get detailed YAML output of a pod</h3>
			<CodeBlock language="linux">
				{'kubectl get pod <pod-name> -o yaml'}
			</CodeBlock>
		</section>
	);
};

export default PodsCommandsSection;

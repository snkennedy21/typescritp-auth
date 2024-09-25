import CodeBlock from '../../../../codeblockExample/CodeblockExample';

const PodSyntax = () => {
	return (
		<section className="mt-10 px-4 mx-auto">
			<h1 className="text-[42px] font-bold">Pod Syntax</h1>
			<p className="text-xl">
				Common syntax for interacting with pods in Kubernetes.
			</p>

			<h2 className="text-2xl font-bold mb-1 mt-12">Creating Pods:</h2>

			<h3 className="text-lg">YAML File</h3>
			<CodeBlock language="yaml">
				{`apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod
  labels:
    app: nginx
spec:
  containers:
  - name: nginx
    image: nginx:latest
    ports:
    - containerPort: 80
`}
			</CodeBlock>

			<h3 className="text-lg">Create</h3>
			<CodeBlock language="linux">
				{'kubectl create -f <pod-definition.yml>'}
			</CodeBlock>

			<h2 className="text-2xl font-bold mb-2 mt-12">Viewing Pods:</h2>

			<h3 className="text-lg">List all pods in the current namespace</h3>
			<CodeBlock language="linux">{'kubectl get pods'}</CodeBlock>

			<h3 className="text-lg">
				Get detailed information about a specific pod
			</h3>
			<CodeBlock language="linux">
				{'kubectl describe pod <pod-name>'}
			</CodeBlock>

			<h2 className="text-2xl font-bold mb-2 mt-12">Managing Pods:</h2>

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

			<h2 className="text-2xl font-bold mb-2 mt-12">Debugging:</h2>

			<h3 className="text-lg">View logs of a pod</h3>
			<CodeBlock language="linux">{'kubectl logs <pod-name>'}</CodeBlock>

			<h3 className="text-lg">Get events related to pods </h3>
			<CodeBlock language="linux">{'kubectl get events'}</CodeBlock>

			<h3 className="text-lg">
				Get detailed YAML output of a pod and output to file
			</h3>
			<CodeBlock language="linux">
				{'kubectl get pod <pod-name> -o yaml > pod-definition.yaml'}
			</CodeBlock>
		</section>
	);
};

export default PodSyntax;

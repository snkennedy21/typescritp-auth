import CodeBlock from '../../../../codeblockExample/CodeblockExample';

const ReplicaSetSyntax = () => {
	return (
		<section className="mt-10 px-4 mx-auto">
			<h1 className="text-[42px] font-bold">ReplicaSet Syntax</h1>
			<p className="text-xl">
				Common syntax for interacting with ReplicaSets in Kubernetes.
			</p>

			<h2 className="text-2xl font-bold mb-1 mt-12">
				Creating ReplicaSets:
			</h2>

			<h3 className="text-lg">YAML File</h3>
			<CodeBlock language="yaml">
				{`apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: nginx-replicaset
  labels:
    app: nginx
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
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
				{'kubectl create -f <replicaset-definition.yml>'}
			</CodeBlock>

			<h2 className="text-2xl font-bold mb-2 mt-12">
				Viewing ReplicaSets:
			</h2>

			<h3 className="text-lg">
				List all ReplicaSets in the current namespace
			</h3>
			<CodeBlock language="linux">{'kubectl get replicasets'}</CodeBlock>

			<h3 className="text-lg">
				Get detailed information about a specific ReplicaSet
			</h3>
			<CodeBlock language="linux">
				{'kubectl describe replicaset <replicaset-name>'}
			</CodeBlock>

			<h2 className="text-2xl font-bold mb-2 mt-12">
				Managing ReplicaSets:
			</h2>

			<h3 className="text-lg">Scale a ReplicaSet</h3>
			<CodeBlock language="linux">
				{'kubectl scale --replicas=5 replicaset <replicaset-name>'}
			</CodeBlock>

			<h3 className="text-lg">Delete a ReplicaSet</h3>
			<CodeBlock language="linux">
				{'kubectl delete replicaset <replicaset-name>'}
			</CodeBlock>

			<h3 className="text-lg">
				Apply changes from a ReplicaSet configuration file
			</h3>
			<CodeBlock language="linux">
				{'kubectl apply -f replicaset-definition.yaml'}
			</CodeBlock>

			<h2 className="text-2xl font-bold mb-2 mt-12">Debugging:</h2>

			<h3 className="text-lg">
				View logs of pods managed by a ReplicaSet
			</h3>
			<CodeBlock language="linux">{'kubectl logs <pod-name>'}</CodeBlock>

			<h3 className="text-lg">Get events related to ReplicaSets</h3>
			<CodeBlock language="linux">{'kubectl get events'}</CodeBlock>

			<h3 className="text-lg">
				Get detailed YAML output of a ReplicaSet and output to file
			</h3>
			<CodeBlock language="linux">
				{
					'kubectl get replicaset <replicaset-name> -o yaml > replicaset-definition.yaml'
				}
			</CodeBlock>
		</section>
	);
};

export default ReplicaSetSyntax;

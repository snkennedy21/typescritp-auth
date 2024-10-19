import CodeBlock from '../../../codeblockExample/CodeblockExample';

const DeploymentSyntax = () => {
	return (
		<section className="mt-10 px-4 mx-auto">
			<h1 className="text-[42px] font-bold">Deployment Syntax</h1>
			<p className="text-xl">
				Common syntax for interacting with Deployments in Kubernetes.
			</p>

			<h2 className="text-2xl font-bold mb-1 mt-12">
				Creating Deployments:
			</h2>

			<h3 className="text-lg">YAML File</h3>
			<CodeBlock language="yaml">
				{`apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
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
				{'kubectl create -f <deployment-definition.yml>'}
			</CodeBlock>

			<h2 className="text-2xl font-bold mb-2 mt-12">
				Viewing Deployments:
			</h2>

			<h3 className="text-lg">
				List all Deployments in the current namespace
			</h3>
			<CodeBlock language="linux">{'kubectl get deployments'}</CodeBlock>

			<h3 className="text-lg">
				Get detailed information about a specific Deployment
			</h3>
			<CodeBlock language="linux">
				{'kubectl describe deployment <deployment-name>'}
			</CodeBlock>

			<h2 className="text-2xl font-bold mb-2 mt-12">
				Managing Deployments:
			</h2>

			<h3 className="text-lg">Scale a Deployment</h3>
			<CodeBlock language="linux">
				{'kubectl scale --replicas=5 deployment <deployment-name>'}
			</CodeBlock>

			<h3 className="text-lg">Delete a Deployment</h3>
			<CodeBlock language="linux">
				{'kubectl delete deployment <deployment-name>'}
			</CodeBlock>

			<h3 className="text-lg">
				Apply changes from a Deployment configuration file
			</h3>
			<CodeBlock language="linux">
				{'kubectl apply -f deployment-definition.yaml'}
			</CodeBlock>

			<h2 className="text-2xl font-bold mb-2 mt-12">Rolling Updates:</h2>

			<h3 className="text-lg">Apply a rolling update to a Deployment</h3>
			<CodeBlock language="linux">
				{'kubectl rollout restart deployment <deployment-name>'}
			</CodeBlock>

			<h3 className="text-lg">
				Pause a Deployment during a rolling update
			</h3>
			<CodeBlock language="linux">
				{'kubectl rollout pause deployment <deployment-name>'}
			</CodeBlock>

			<h3 className="text-lg">Resume a paused Deployment</h3>
			<CodeBlock language="linux">
				{'kubectl rollout resume deployment <deployment-name>'}
			</CodeBlock>

			<h3 className="text-lg">
				Check the status of a Deployment rollout
			</h3>
			<CodeBlock language="linux">
				{'kubectl rollout status deployment <deployment-name>'}
			</CodeBlock>

			<h2 className="text-2xl font-bold mb-2 mt-12">Rollback:</h2>

			<h3 className="text-lg">
				Rollback to a previous Deployment revision
			</h3>
			<CodeBlock language="linux">
				{'kubectl rollout undo deployment <deployment-name>'}
			</CodeBlock>

			<h3 className="text-lg">Rollback to a specific revision</h3>
			<CodeBlock language="linux">
				{
					'kubectl rollout undo deployment <deployment-name> --to-revision=<revision-number>'
				}
			</CodeBlock>

			<h2 className="text-2xl font-bold mb-2 mt-12">Debugging:</h2>

			<h3 className="text-lg">
				View logs of pods managed by a Deployment
			</h3>
			<CodeBlock language="linux">{'kubectl logs <pod-name>'}</CodeBlock>

			<h3 className="text-lg">Get events related to Deployments</h3>
			<CodeBlock language="linux">{'kubectl get events'}</CodeBlock>

			<h3 className="text-lg">
				Get detailed YAML output of a Deployment and output to file
			</h3>
			<CodeBlock language="linux">
				{
					'kubectl get deployment <deployment-name> -o yaml > deployment-definition.yaml'
				}
			</CodeBlock>
		</section>
	);
};

export default DeploymentSyntax;

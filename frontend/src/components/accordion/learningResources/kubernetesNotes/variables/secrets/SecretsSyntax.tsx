import CodeBlock from '../../../../../codeblockExample/CodeblockExample';

const SecretsSyntax = () => {
	return (
		<section className="mt-10 px-4 mx-auto">
			<h1 className="text-[42px] font-bold">Secrets Syntax</h1>
			<p className="text-xl">
				Common syntax for interacting with Secrets in Kubernetes.
			</p>

			{/* Creating Secrets Section */}
			<h2 className="text-2xl font-bold mb-1 mt-12">Creating Secrets:</h2>

			<h3 className="text-lg">Imperative Command</h3>
			<CodeBlock language="linux">
				{
					'kubectl create secret generic <secret-name> --from-literal=username=admin --from-literal=password=admin123'
				}
			</CodeBlock>

			<h3 className="text-lg">From a File</h3>
			<CodeBlock language="linux">
				{
					'kubectl create secret generic <secret-name> --from-file=<path-to-file>'
				}
			</CodeBlock>

			<h3 className="text-lg">From a YAML File</h3>
			<CodeBlock language="yaml">
				{`apiVersion: v1
kind: Secret
metadata:
  name: example-secret
type: Opaque
data:
  username: YWRtaW4=
  password: YWRtaW4xMjM=
`}
			</CodeBlock>
			<CodeBlock language="linux">
				{'kubectl apply -f <secret-definition.yml>'}
			</CodeBlock>

			{/* Viewing and Managing Secrets */}
			<h2 className="text-2xl font-bold mb-2 mt-12">Viewing Secrets:</h2>

			<h3 className="text-lg">
				List all Secrets in the current namespace
			</h3>
			<CodeBlock language="linux">{'kubectl get secrets'}</CodeBlock>

			<h3 className="text-lg">
				Get detailed information about a specific Secret
			</h3>
			<CodeBlock language="linux">
				{'kubectl describe secret <secret-name>'}
			</CodeBlock>

			<h3 className="text-lg">Get the YAML definition of a Secret</h3>
			<CodeBlock language="linux">
				{'kubectl get secret <secret-name> -o yaml'}
			</CodeBlock>

			{/* Using Secrets with Pods */}
			<h2 className="text-2xl font-bold mb-2 mt-12">
				Using Secrets with Pods:
			</h2>

			<h3 className="text-lg">Inject as Environment Variables</h3>
			<CodeBlock language="yaml">
				{`apiVersion: v1
kind: Pod
metadata:
  name: example-pod
spec:
  containers:
  - name: my-container
    image: busybox
    env:
    - name: USER_NAME
      valueFrom:
        secretKeyRef:
          name: example-secret
          key: username
    - name: PASSWORD
      valueFrom:
        secretKeyRef:
          name: example-secret
          key: password
`}
			</CodeBlock>

			<h3 className="text-lg">Mount Secrets as Volumes</h3>
			<CodeBlock language="yaml">
				{`apiVersion: v1
kind: Pod
metadata:
  name: example-pod
spec:
  containers:
  - name: my-container
    image: busybox
    volumeMounts:
    - name: secret-volume
      mountPath: "/etc/secret"
  volumes:
  - name: secret-volume
    secret:
      secretName: example-secret
`}
			</CodeBlock>

			<h3 className="text-lg">Display Mounted Secret Content</h3>
			<CodeBlock language="linux">
				{'kubectl exec -it <pod-name> -- cat /etc/secret/username'}
			</CodeBlock>

			{/* Managing and Deleting Secrets */}
			<h2 className="text-2xl font-bold mb-2 mt-12">Managing Secrets:</h2>

			<h3 className="text-lg">Update a Secret</h3>
			<CodeBlock language="linux">
				{
					'kubectl create secret generic <secret-name> --from-literal=key3=value3 --dry-run=client -o yaml | kubectl apply -f -'
				}
			</CodeBlock>

			<h3 className="text-lg">Delete a Secret</h3>
			<CodeBlock language="linux">
				{'kubectl delete secret <secret-name>'}
			</CodeBlock>
		</section>
	);
};

export default SecretsSyntax;

import CodeBlock from '../../../../../codeblockExample/CodeblockExample';

const ConfigMapSyntax = () => {
	return (
		<section className="mt-10 px-4 mx-auto">
			<h1 className="text-[42px] font-bold">ConfigMap Syntax</h1>
			<p className="text-xl">
				Common syntax for interacting with ConfigMaps in Kubernetes.
			</p>

			{/* Creating ConfigMaps Section */}
			<h2 className="text-2xl font-bold mb-1 mt-12">
				Creating ConfigMaps:
			</h2>

			<h3 className="text-lg">Imperative Command</h3>
			<CodeBlock language="linux">
				{
					'kubectl create configmap <configmap-name> --from-literal=key1=value1 --from-literal=key2=value2'
				}
			</CodeBlock>

			<h3 className="text-lg">From a File</h3>
			<CodeBlock language="linux">
				{
					'kubectl create configmap <configmap-name> --from-file=<path-to-file>'
				}
			</CodeBlock>

			<h3 className="text-lg">From a Directory</h3>
			<CodeBlock language="linux">
				{
					'kubectl create configmap <configmap-name> --from-file=<directory-path>'
				}
			</CodeBlock>

			<h3 className="text-lg">From a YAML File</h3>
			<CodeBlock language="yaml">
				{`apiVersion: v1
kind: ConfigMap
metadata:
  name: example-configmap
data:
  key1: value1
  key2: value2
`}
			</CodeBlock>
			<CodeBlock language="linux">
				{'kubectl apply -f <configmap-definition.yml>'}
			</CodeBlock>

			{/* Viewing and Managing ConfigMaps */}
			<h2 className="text-2xl font-bold mb-2 mt-12">
				Viewing ConfigMaps:
			</h2>

			<h3 className="text-lg">
				List all ConfigMaps in the current namespace
			</h3>
			<CodeBlock language="linux">{'kubectl get configmaps'}</CodeBlock>

			<h3 className="text-lg">
				Get detailed information about a specific ConfigMap
			</h3>
			<CodeBlock language="linux">
				{'kubectl describe configmap <configmap-name>'}
			</CodeBlock>

			<h3 className="text-lg">Get the YAML definition of a ConfigMap</h3>
			<CodeBlock language="linux">
				{'kubectl get configmap <configmap-name> -o yaml'}
			</CodeBlock>

			{/* Using ConfigMaps with Pods */}
			<h2 className="text-2xl font-bold mb-2 mt-12">
				Using ConfigMaps with Pods:
			</h2>

			<h3 className="text-lg">
				Inject as Environment Variables (envFrom)
			</h3>
			<CodeBlock language="yaml">
				{`apiVersion: v1
kind: Pod
metadata:
  name: example-pod
spec:
  containers:
  - name: my-container
    image: busybox
    envFrom:
    - configMapRef:
        name: example-configmap
`}
			</CodeBlock>

			<h3 className="text-lg">Individual Environment Variables</h3>
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
    - name: KEY1
      valueFrom:
        configMapKeyRef:
          name: example-configmap
          key: key1
`}
			</CodeBlock>

			{/* Using ConfigMaps as Volumes */}
			<h2 className="text-2xl font-bold mb-2 mt-12">
				Mounting ConfigMaps as Volumes:
			</h2>

			<h3 className="text-lg">Mount ConfigMap as a Volume</h3>
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
    - name: config-volume
      mountPath: /etc/config
  volumes:
  - name: config-volume
    configMap:
      name: example-configmap
`}
			</CodeBlock>

			<h3 className="text-lg">List Files from the ConfigMap</h3>
			<CodeBlock language="linux">
				{'kubectl exec -it <pod-name> -- ls /etc/config'}
			</CodeBlock>

			<h3 className="text-lg">Display the Content of a File</h3>
			<CodeBlock language="linux">
				{'kubectl exec -it <pod-name> -- cat /etc/config/key1'}
			</CodeBlock>

			{/* Managing and Deleting ConfigMaps */}
			<h2 className="text-2xl font-bold mb-2 mt-12">
				Managing ConfigMaps:
			</h2>

			<h3 className="text-lg">Update a ConfigMap</h3>
			<CodeBlock language="linux">
				{
					'kubectl create configmap <configmap-name> --from-literal=key3=value3 --dry-run=client -o yaml | kubectl apply -f -'
				}
			</CodeBlock>

			<h3 className="text-lg">Delete a ConfigMap</h3>
			<CodeBlock language="linux">
				{'kubectl delete configmap <configmap-name>'}
			</CodeBlock>
		</section>
	);
};

export default ConfigMapSyntax;

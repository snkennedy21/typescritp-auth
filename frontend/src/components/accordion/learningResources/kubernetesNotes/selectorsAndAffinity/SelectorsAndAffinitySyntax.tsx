import CodeBlock from '../../../../codeblockExample/CodeblockExample';

const SelectorsAndAffinitySyntax = () => {
	return (
		<section className="mt-10 px-4 mx-auto">
			<h1 className="text-[42px] font-bold">
				Selectors and Affinity Syntax
			</h1>
			<p className="text-xl">
				Syntax for defining node selectors, node affinity, and pod
				affinity/anti-affinity in Kubernetes.
			</p>

			<h2 className="text-2xl font-bold mb-1 mt-12">Node Selectors:</h2>

			<h3 className="text-lg">
				Using Node Selectors to Control Pod Placement
			</h3>
			<p className="text-lg">
				Node selectors allow you to constrain pods to run on nodes with
				specific labels. This is a simpler way to schedule pods on
				specific nodes compared to node affinity.
			</p>

			<h3 className="text-lg">Example YAML for Node Selector</h3>
			<CodeBlock language="yaml">
				{`apiVersion: v1
kind: Pod
metadata:
  name: pod-with-node-selector
spec:
  nodeSelector:
    disktype: ssd
  containers:
  - name: nginx
    image: nginx
`}
			</CodeBlock>

			<p className="text-lg">
				In this example, the pod will only be scheduled on nodes that
				have the label <code>disktype=ssd</code>.
			</p>

			<h2 className="text-2xl font-bold mb-2 mt-12">
				Applying Labels to a Node:
			</h2>

			<h3 className="text-lg">Add a Label to a Node</h3>
			<CodeBlock language="linux">
				{'kubectl label nodes <node-name> <label-key>=<label-value>'}
			</CodeBlock>

			<p className="text-lg">
				For example, to add the label <code>disktype=ssd</code> to a
				node:
			</p>

			<CodeBlock language="linux">
				{'kubectl label nodes node1 disktype=ssd'}
			</CodeBlock>

			<h3 className="text-lg">Remove a Label from a Node</h3>
			<CodeBlock language="linux">
				{'kubectl label nodes <node-name> <label-key>-'}
			</CodeBlock>

			<p className="text-lg">
				For example, to remove the label <code>disktype</code> from a
				node:
			</p>

			<CodeBlock language="linux">
				{'kubectl label nodes node1 disktype-'}
			</CodeBlock>

			<h2 className="text-2xl font-bold mb-2 mt-12">Node Affinity:</h2>

			<h3 className="text-lg">Node Affinity Example</h3>
			<CodeBlock language="yaml">
				{`apiVersion: v1
kind: Pod
metadata:
  name: pod-with-node-affinity
spec:
  affinity:
    nodeAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
        nodeSelectorTerms:
        - matchExpressions:
          - key: "kubernetes.io/e2e-az-name"
            operator: In
            values: 
            - e2e-az1
            - e2e-az2
      preferredDuringSchedulingIgnoredDuringExecution:
        - weight: 1
          preference:
            matchExpressions:
            - key: "node-type"
              operator: In
              values: ["high-memory"]
  containers:
  - name: nginx
    image: nginx
`}
			</CodeBlock>

			<p className="text-lg">
				In this example, the pod requires nodes labeled with{' '}
				<code>kubernetes.io/e2e-az-name</code>, but it prefers nodes
				labeled with <code>node-type=high-memory</code>. If such nodes
				are available, they are prioritized, but the pod can still be
				scheduled on other nodes if needed.
			</p>

			<h2 className="text-2xl font-bold mb-2 mt-12">Pod Affinity:</h2>

			<h3 className="text-lg">Pod Affinity Example</h3>
			<CodeBlock language="yaml">
				{`apiVersion: v1
kind: Pod
metadata:
  name: pod-with-affinity
spec:
  affinity:
    podAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
        labelSelector:
          matchExpressions:
          - key: security
            operator: In
            values:
            - S1
        topologyKey: "kubernetes.io/hostname"
    podAntiAffinity:
      preferredDuringSchedulingIgnoredDuringExecution:
        - weight: 1
          podAffinityTerm:
            labelSelector:
              matchExpressions:
              - key: app
                operator: In
                values: ["frontend"]
            topologyKey: "kubernetes.io/hostname"
  containers:
  - name: nginx
    image: nginx
`}
			</CodeBlock>

			<p className="text-lg">
				In this example, the pod is required to be scheduled on nodes
				where other pods with <code>security=S1</code> exist (required
				affinity), but it prefers not to be scheduled on nodes where
				pods with <code>app=frontend</code> are located (preferred
				anti-affinity).
			</p>
		</section>
	);
};

export default SelectorsAndAffinitySyntax;

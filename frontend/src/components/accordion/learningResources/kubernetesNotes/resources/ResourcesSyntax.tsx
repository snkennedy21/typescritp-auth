import React from 'react';
import CodeBlock from '../../../../codeblockExample/CodeblockExample';

const ResourcesSyntax = () => {
	return (
		<section className="mt-10 px-4 mx-auto">
			<h1 className="text-[42px] font-bold">
				Resource Management Syntax
			</h1>
			<p className="text-xl">
				Here is the common syntax for defining resource requests,
				limits, and quotas in Kubernetes.
			</p>

			<h2 className="text-2xl font-bold mb-1 mt-12">
				Setting Requests and Limits:
			</h2>

			<h3 className="text-lg">YAML File for a Pod</h3>
			<CodeBlock language="yaml">
				{`apiVersion: v1
kind: Pod
metadata:
  name: resource-demo
  labels:
    app: demo
spec:
  containers:
  - name: resource-demo-container
    image: nginx:latest
    resources:
      requests:
        memory: "64Mi"
        cpu: "250m"
      limits:
        memory: "128Mi"
        cpu: "500m"
`}
			</CodeBlock>

			<h3 className="text-lg">Apply the YAML file</h3>
			<CodeBlock language="linux">
				{'kubectl apply -f <resource-demo.yml>'}
			</CodeBlock>

			<h2 className="text-2xl font-bold mb-2 mt-12">
				Setting Resource Quotas:
			</h2>

			<h3 className="text-lg">ResourceQuota YAML Example</h3>
			<CodeBlock language="yaml">
				{`apiVersion: v1
kind: ResourceQuota
metadata:
  name: compute-resources
  namespace: demo
spec:
  hard:
    pods: "10"
    requests.cpu: "4"
    requests.memory: "8Gi"
    limits.cpu: "10"
    limits.memory: "16Gi"
`}
			</CodeBlock>

			<h3 className="text-lg">Create Resource Quota</h3>
			<CodeBlock language="linux">
				{'kubectl create -f <resource-quota.yml>'}
			</CodeBlock>

			<h2 className="text-2xl font-bold mb-2 mt-12">
				Viewing Resource Usage:
			</h2>

			<h3 className="text-lg">List Resource Quotas in a Namespace</h3>
			<CodeBlock language="linux">
				{'kubectl get resourcequota -n <namespace>'}
			</CodeBlock>

			<h3 className="text-lg">View Detailed Information</h3>
			<CodeBlock language="linux">
				{'kubectl describe resourcequota <quota-name> -n <namespace>'}
			</CodeBlock>

			<h2 className="text-2xl font-bold mb-2 mt-12">
				Managing Resources:
			</h2>

			<h3 className="text-lg">Update Resource Requests and Limits</h3>
			<CodeBlock language="linux">
				{'kubectl edit pod <pod-name>'}
			</CodeBlock>

			<h3 className="text-lg">Delete a Resource Quota</h3>
			<CodeBlock language="linux">
				{'kubectl delete resourcequota <quota-name> -n <namespace>'}
			</CodeBlock>

			<h2 className="text-2xl font-bold mb-2 mt-12">
				Debugging Resource Issues:
			</h2>

			<h3 className="text-lg">Check Resource Requests and Limits</h3>
			<CodeBlock language="linux">
				{
					'kubectl get pod <pod-name> -o=jsonpath="{.spec.containers[*].resources}"'
				}
			</CodeBlock>

			<h3 className="text-lg">Get Namespace Resource Usage</h3>
			<CodeBlock language="linux">
				{'kubectl top pod -n <namespace>'}
			</CodeBlock>
		</section>
	);
};

export default ResourcesSyntax;

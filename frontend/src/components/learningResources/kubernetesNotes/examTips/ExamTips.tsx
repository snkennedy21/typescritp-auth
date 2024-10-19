import CodeBlock from '../../../codeblockExample/CodeblockExample';

const ExamTips = () => {
	return (
		<section className="mt-10 px-4 mx-auto">
			<h1 className="text-[42px] font-bold">
				Exam Tips: Common Kubernetes Commands
			</h1>
			<p className="text-xl">
				Use the following commands as a quick reference for common
				Kubernetes tasks during your certification exam.
			</p>

			<h2 className="text-2xl font-bold mb-1 mt-12">POD Commands:</h2>

			<h3 className="text-lg">Create an NGINX Pod</h3>
			<CodeBlock language="linux">
				{'kubectl run nginx --image=nginx'}
			</CodeBlock>

			<h3 className="text-lg">
				Generate POD Manifest YAML file without creating it
			</h3>
			<CodeBlock language="linux">
				{'kubectl run nginx --image=nginx --dry-run=client -o yaml'}
			</CodeBlock>

			<h3 className="text-lg">Save POD YAML definition to a file</h3>
			<CodeBlock language="linux">
				{
					'kubectl run nginx --image=nginx --dry-run=client -o yaml > nginx-pod.yaml'
				}
			</CodeBlock>

			<h2 className="text-2xl font-bold mb-1 mt-12">
				Deployment Commands:
			</h2>

			<h3 className="text-lg">Create a deployment</h3>
			<CodeBlock language="linux">
				{'kubectl create deployment --image=nginx nginx'}
			</CodeBlock>

			<h3 className="text-lg">
				Generate Deployment YAML file without creating it
			</h3>
			<CodeBlock language="linux">
				{
					'kubectl create deployment --image=nginx nginx --dry-run=client -o yaml'
				}
			</CodeBlock>

			<h3 className="text-lg">Create a Deployment with 4 Replicas</h3>
			<CodeBlock language="linux">
				{'kubectl create deployment nginx --image=nginx --replicas=4'}
			</CodeBlock>

			<h3 className="text-lg">Scale Deployment</h3>
			<CodeBlock language="linux">
				{'kubectl scale deployment nginx --replicas=4'}
			</CodeBlock>

			<h3 className="text-lg">
				Save Deployment YAML definition to a file
			</h3>
			<CodeBlock language="linux">
				{
					'kubectl create deployment nginx --image=nginx --dry-run=client -o yaml > nginx-deployment.yaml'
				}
			</CodeBlock>

			<h2 className="text-2xl font-bold mb-1 mt-12">Service Commands:</h2>

			<h3 className="text-lg">
				Create a ClusterIP Service to expose `redis` on port 6379
			</h3>
			<CodeBlock language="linux">
				{
					'kubectl expose pod redis --port=6379 --name redis-service --dry-run=client -o yaml'
				}
			</CodeBlock>

			<h3 className="text-lg">
				Create a Service without using pod labels as selectors
			</h3>
			<CodeBlock language="linux">
				{
					'kubectl create service clusterip redis --tcp=6379:6379 --dry-run=client -o yaml'
				}
			</CodeBlock>

			<h3 className="text-lg">
				Create a NodePort Service to expose `nginx` on port 30080
			</h3>
			<CodeBlock language="linux">
				{
					'kubectl expose pod nginx --port=80 --name nginx-service --type=NodePort --dry-run=client -o yaml'
				}
			</CodeBlock>

			<h3 className="text-lg">
				Create a NodePort Service with a specific node port
			</h3>
			<CodeBlock language="linux">
				{
					'kubectl create service nodeport nginx --tcp=80:80 --node-port=30080 --dry-run=client -o yaml'
				}
			</CodeBlock>

			<h2 className="text-2xl font-bold mb-1 mt-12">Useful Options:</h2>

			<h3 className="text-lg">`--dry-run=client`</h3>
			<p className="text-base">
				This option simulates the command without creating the resource.
				It’s useful for testing and generating resource definition
				files.
			</p>

			<h3 className="text-lg">`-o yaml`</h3>
			<p className="text-base">
				Outputs the resource definition in YAML format, which can be
				redirected to a file for further modification.
			</p>
		</section>
	);
};

export default ExamTips;

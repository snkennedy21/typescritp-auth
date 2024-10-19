import CodeBlock from '../../../../codeblockExample/CodeblockExample';

const ProbesSyntax = () => {
	return (
		<section className="mt-10 px-4 mx-auto">
			<h1 className="text-[42px] font-bold">
				Readiness and Liveness Probes Syntax
			</h1>
			<p className="text-xl">
				Below is the common syntax for defining readiness and liveness
				probes in Kubernetes.
			</p>

			<h2 className="text-2xl font-bold mb-1 mt-12">
				Liveness Probe Example:
			</h2>

			<h3 className="text-lg">HTTP Liveness Probe</h3>
			<CodeBlock language="yaml">
				{`apiVersion: v1
kind: Pod
metadata:
  name: liveness-example
spec:
  containers:
  - name: myapp
    image: myapp:latest
    livenessProbe:
      httpGet:
        path: /healthz
        port: 8080
      initialDelaySeconds: 10
      periodSeconds: 5
`}
			</CodeBlock>

			<p className="text-lg">
				In this example, Kubernetes calls the <code>/healthz</code>{' '}
				endpoint on port 8080 every 5 seconds, starting 10 seconds after
				the container has been created. If the endpoint fails,
				Kubernetes will restart the container.
			</p>

			<h2 className="text-2xl font-bold mb-2 mt-12">
				Readiness Probe Example:
			</h2>

			<h3 className="text-lg">TCP Readiness Probe</h3>
			<CodeBlock language="yaml">
				{`apiVersion: v1
kind: Pod
metadata:
  name: readiness-example
spec:
  containers:
  - name: myapp
    image: myapp:latest
    readinessProbe:
      tcpSocket:
        port: 8080
      initialDelaySeconds: 5
      periodSeconds: 10
`}
			</CodeBlock>

			<p className="text-lg">
				This readiness probe checks if the application is listening on
				port 8080. If the application is not ready, Kubernetes will
				temporarily remove it from service. The probe starts after 5
				seconds and is repeated every 10 seconds.
			</p>

			<h2 className="text-2xl font-bold mb-2 mt-12">
				Command Probe Example:
			</h2>

			<h3 className="text-lg">Command Liveness Probe</h3>
			<CodeBlock language="yaml">
				{`apiVersion: v1
kind: Pod
metadata:
  name: command-liveness-example
spec:
  containers:
  - name: myapp
    image: myapp:latest
    livenessProbe:
      exec:
        command:
        - cat
        - /tmp/healthy
      initialDelaySeconds: 5
      periodSeconds: 5
`}
			</CodeBlock>

			<p className="text-lg">
				In this example, the liveness probe runs the command{' '}
				<code>cat /tmp/healthy</code>. If the file is not present or
				accessible, the probe fails, and Kubernetes will restart the
				container.
			</p>

			<h2 className="text-2xl font-bold mb-2 mt-12">Managing Probes:</h2>

			<h3 className="text-lg">Check the Probe Status</h3>
			<CodeBlock language="linux">
				{'kubectl describe pod <pod-name>'}
			</CodeBlock>

			<h3 className="text-lg">Edit Probe Configuration</h3>
			<CodeBlock language="linux">
				{'kubectl edit pod <pod-name>'}
			</CodeBlock>
		</section>
	);
};

export default ProbesSyntax;

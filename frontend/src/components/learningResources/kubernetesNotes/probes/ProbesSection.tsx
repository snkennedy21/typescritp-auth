const ProbesSection = () => {
	return (
		<section className="mt-10 px-4 mx-auto">
			<h1 className="text-[42px] font-bold">
				Readiness and Liveness Probes
			</h1>

			<p className="text-xl">
				Kubernetes uses readiness and liveness probes to monitor the
				health of applications running inside containers. These probes
				help ensure that your application is running smoothly and is
				capable of handling traffic.
			</p>

			<h2 className="text-xl font-semibold mb-2">
				Understanding Liveness Probes:
			</h2>

			<ul className="list-disc list-outside pl-6 mb-4 space-y-2">
				<li>
					<strong>Liveness Probes:</strong> Liveness probes determine
					if a container is running. If the liveness probe fails,
					Kubernetes will restart the container.
				</li>
				<li>
					<strong>Use Case:</strong> This probe is useful for
					detecting when your application is stuck or has encountered
					a fatal error that prevents it from running properly.
				</li>
			</ul>

			<h2 className="text-xl font-semibold mb-2">
				Understanding Readiness Probes:
			</h2>

			<ul className="list-disc list-outside pl-6 mb-4 space-y-2">
				<li>
					<strong>Readiness Probes:</strong> Readiness probes
					determine if a container is ready to serve traffic. If the
					probe fails, the container is removed from the service's
					endpoints.
				</li>
				<li>
					<strong>Use Case:</strong> Readiness probes are useful for
					delaying traffic to a container that needs time to
					initialize or recover from an issue.
				</li>
			</ul>

			<h2 className="text-xl font-semibold mb-2">Types of Probes:</h2>

			<ul className="list-disc list-outside pl-6 mb-4 space-y-2">
				<li>
					<strong>HTTP Probes:</strong> Kubernetes can periodically
					call an HTTP endpoint within your container to check its
					health.
				</li>
				<li>
					<strong>TCP Probes:</strong> Kubernetes can attempt to open
					a TCP connection to your container to check if it’s
					listening.
				</li>
				<li>
					<strong>Command Probes:</strong> Kubernetes can run a
					command inside your container to check its health.
				</li>
			</ul>

			<h2 className="text-xl font-semibold mb-2">How Probes Work:</h2>

			<ol className="list-decimal list-outside pl-6 mb-4 space-y-2">
				<li>
					<strong>Initial Delay:</strong> Probes often include an
					initial delay, allowing the container time to start before
					health checks begin.
				</li>
				<li>
					<strong>Periodicity:</strong> Probes are executed
					periodically, allowing Kubernetes to check the container’s
					health at regular intervals.
				</li>
				<li>
					<strong>Restarting or Unlisting:</strong> If the liveness
					probe fails, Kubernetes will restart the container. If the
					readiness probe fails, the container is temporarily removed
					from the list of available endpoints.
				</li>
			</ol>

			<h2 className="text-xl font-semibold mb-2">Usage Scenarios:</h2>

			<ul className="list-disc list-outside pl-6 mb-4 space-y-2">
				<li>
					<strong>Application Warm-Up:</strong> Use a readiness probe
					to prevent traffic from reaching your application until it’s
					fully initialized.
				</li>
				<li>
					<strong>Monitoring Critical Services:</strong> Use liveness
					probes to detect and recover from application crashes or
					stuck states.
				</li>
				<li>
					<strong>Graceful Degradation:</strong> Readiness probes can
					be used to temporarily take a container out of service for
					maintenance or recovery, without restarting it.
				</li>
			</ul>

			<h2 className="text-xl font-semibold mb-2">Summary:</h2>

			<p>
				Kubernetes readiness and liveness probes are essential tools for
				managing the lifecycle of your containers, ensuring that only
				healthy containers serve traffic and that failing containers are
				quickly recovered.
			</p>
		</section>
	);
};

export default ProbesSection;

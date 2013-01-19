require(['bootstrap', '$', 'arbor', 'GraphRenderer', 'Simulator', 'SimulatorView'], function(btstrp, $, arbor, Renderer, Simulator, SimView) {
	var sys = arbor.ParticleSystem(1000, 600, 0.5);
	sys.parameters({
		gravity: true
	});
	sys.addEdge('a', 'b');
	sys.addEdge('a', 'c');
	sys.addEdge('a', 'd');
	sys.addNode('f');

	sys.renderer = new Renderer($('.main .canvas')[0]);

	var simulator = new Simulator(sys);
	var simView = new SimView({
		model: simulator
	});
});


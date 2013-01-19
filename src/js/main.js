require(['bootstrap', '$', 'arbor', 'GraphRenderer', 'Simulator', 'SimulatorControlsView', 'SimulatorLogView', 'utils', 'algo/Simple'], //
function(btstrp, $, arbor, Renderer, Simulator, SimView, SimLog, utils, SimpleAlgo) {
	var sys = arbor.ParticleSystem(100, 600, 0.1);
	sys.parameters({
		gravity: true
	});
	sys.addEdge('a', 'b');
	sys.addEdge('a', 'c');
	sys.addEdge('a', 'd');
	sys.addNode('f');

	sys.renderer = new Renderer($('.main .canvas')[0]);

	window.setTimeout(function() {
		var simulator = new Simulator(sys.renderer.getSystem(), SimpleAlgo);
		var simView = new SimView({
			model: simulator
		});
		var simLog = new SimLog({
			model: simulator
		});
	},
	500);
});


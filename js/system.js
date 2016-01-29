define(['arbor'], function(arbor) {
	var sys = arbor.ParticleSystem(70, 700, 0.8);

	sys.parameters({
		gravity: true
	});

	return sys;
});


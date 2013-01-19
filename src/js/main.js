require(['bootstrap', '$', 'system', 'view/GraphRenderer', 'Graph', 'Preferences', 'view/PreferencesView', 'Simulator', 'view/SimulatorControlsView', 'view/SimulatorLogView'], //
function(btstrp, $, sys, Renderer, Graph, Pref, PrefView, Simulator, SimCtrlView, SimLogView) {
	sys.renderer = new Renderer($('.main .canvas')[0]);

	var app = {};
	app.sys = sys;
	app.graph = new Graph(sys);

	app.prefs = new Pref({
		id: 1
	},
	app.graph);
	app.prefsView = new PrefView({
		model: app.prefs
	});

	app.sim = new Simulator(app.graph, sys, app.prefs);
	app.simView = new SimCtrlView({
		model: app.sim
	});
	app.simLog = new SimLogView({
		model: app.sim
	});

  app.prefs.fetch();

	window.app = app;

});


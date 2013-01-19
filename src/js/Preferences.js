define(['_', 'DotParser', 'backbone', 'backbone.storage'], function(_, DotParser, Backbone, Store) {
	var Prefs = Backbone.Model.extend({
		localStorage: new Store("preferences"),
		defaults: {
			graph: {},
			delay: 1000,
			algo: 'Simple',
			graphError: ""
		},
		initialize: function(options, graph) {
			this.graph = graph;
			this.on('change:graph', this.updateGraph, this);
		},
		updateGraph: function(e) {
			if (this.isGraphChanged(this.currentGraph)) {
				this.currentGraph = this.get('graph');
				this.graph.parse(this.currentGraph);
			}
		},
		setDelay: function(delay) {
			this.save('delay', delay);
		},
		setAlgo: function(algo) {
			this.save('algo', algo);
		},
		parseGraph: function(graphText) {
			this.save('graphText', graphText);
			this.set('graphError', '');
			try {
				var graph = DotParser.parse(graphText);
				this.setGraph(graph);
			} catch(e) {
				this.set('graphError', e);
			}
		},
		isGraphChanged: function(graph) {
			return ! _.isEqual(graph, this.get('graph'));
		},
		setGraph: function(graph) {
			if (this.isGraphChanged(graph)) {
				this.save('graph', graph);
			}
		}
	});

	return Prefs;

});


define(['_', 'backbone'], function(_, Backbone) {
	var graph = Backbone.Model.extend({
		system: null,
		initialize: function(system) {
			this.system = system;
		},
		slowly: function(delay, funcs) {
			_.each(funcs, function(f, i) {
        if (delay === 0) {
          f();
        } else {
          _.delay(f, i * delay);
        }
			});
			return funcs;
		},
		reparse: function() {
      this.parse(this.graph, 0);
		},
		parse: function(graph, slowly) {
      this.graph = graph;

			//Remove whole graph
			this.system.prune(function() {
				return true;
			});

			slowly = _.isUndefined(slowly) ? 200: slowly;
			//add nodes
			var noOfNodes = this.slowly(slowly, _.map(graph.nodes, function(node) {
				return function() {
					this.system.addNode(node);
				}.bind(this);
			},
			this)).length;

			//add edges
			var noOfEdges = this.slowly(slowly, _.map(graph.edges, function(edge) {
				return function() {
					this.system.addEdge(edge[0], edge[1]);
				}.bind(this);
			},
			this)).length;

			//Trigger change for listeners.
			_.delay(function() {
				this.trigger('change');
			}.bind(this), Math.max(noOfNodes, noOfEdges) * slowly);
		}
	});

	return graph;
});


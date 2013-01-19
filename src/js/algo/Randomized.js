define(['_'], function(_) {
	var Randomized = {
		nodes: null,
		edges: null,
		i: null,
		s: null,
		tNode: _.template('<span class="label"><%= node %></span>'),

		STEPS: {
			MARK_V: 0,
			UNMARK: 1,
			ADD_TO_S: 2
		},

		init: function(nodes) {
			this.nodes = _.shuffle(nodes);
			this.i = [];
			this.s = [];
			this.internalStep = this.STEPS.MARK_V;
		},

		/**
     * Returns true with given probability
     */
		random: function(probability) {
			return Math.random() < probability;
		},

		node: function(node) {
			return this.tNode({
				node: node
			});
		},

		step: function(utils) {
			var msgs = [];
      this.nodes = utils.getNodes();

			if (this.internalStep === this.STEPS.MARK_V) {
				//2.1
				_.each(this.nodes, function(node) {
					var deg = node.getDegree()
					if (deg === 0) {
						msgs.push(this.node(node) + "is isolated adding to result.");
						this.i.push(node);
						utils.removeNode(node);
					} else {
						var p = 1 / (2 * deg);
						if (this.random(p)) {
							node.mark();
							msgs.push("Marked " + this.node(node) + " with p = 1 / (2 * " + deg + ")");
						} else {
							msgs.push("Didn't mark " + this.node(node) + " with p= 1 / (2 * " + deg + ")");
						}
					}
				},
				this);

				this.internalStep = this.STEPS.UNMARK;
			} else if (this.internalStep === this.STEPS.UNMARK) {
				//2.2
				_.each(utils.getEdges(), function(edge) {
					var v1 = edge.from();
					var v2 = edge.to();
					if (v1.isMarked() && v2.isMarked()) {
						if (v1.getDegree() < v2.getDegree()) {
							v1.unmark();
							msgs.push("Unmarking " + this.node(v1));
						} else {
							v2.unmark();
							msgs.push("Unmarking " + this.node(v2));
						}
					}
				},
				this);
				if (msgs.length === 0) {
					msgs.push("No need to unmark anything.");
				}

				this.internalStep = this.STEPS.ADD_TO_S;
			} else if (this.internalStep === this.STEPS.ADD_TO_S) {
				// 2.3
				_.each(this.nodes, function(node) {
					if (node.isMarked()) {
						this.s.push(node);
					}
				},
				this);

				//2.4
				this.i = this.i.concat(this.s);
				msgs.push("Adding new nodes: " + _.map(this.s, this.node, this));

				//2.5 Removing S and neighbourhood
				_.each(this.s, function(node) {
					var neighs = utils.getNeighbourhood(node);
					msgs.push('Removing from V ' + this.node(node) + " and neighs: " + _.map(neighs, this.node, this));

					neighs.push(node);
					_.each(neighs, function(n) {
						utils.removeNode(n);
					});
				},
				this);

				this.s = [];
				this.internalStep = this.STEPS.MARK_V;
			} else {
				throw new Error("Unknonw step: " + this.internalStep);
			}

			return msgs;
		},
		isDone: function() {
			return this.nodes.length === 0;
		},
		getResult: function() {
			return this.i;
		}
	};

	return Randomized;

});


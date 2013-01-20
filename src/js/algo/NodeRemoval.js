define(['_'], function(_) {
	var Simple = {
		nodes: null,
		p: 1 / 2,
		phase: 1,

		init: function(nodes) {
			this.nodes = _.shuffle(nodes);
			this.phase = 1;
      this.steps = 0;
		},

		step: function(utils) {
      this.steps++;

			var msgs = [];
			this.nodes = utils.getNodes();

			if (this.phase === 1) {
				var noOfNodesToMark = Math.ceil(this.nodes.length / 2 + Math.random() * this.nodes.length / 2);

				var nodesToMark = _.first(_.shuffle(this.nodes), noOfNodesToMark);
				msgs.push("Marking nodes: " + _.map(nodesToMark, function(node) {
					return "<span class=\"label\">" + node + "</span>";
				}));

				//mark nodes
				_.each(nodesToMark, function(node) {
					node.mark();
				});

				this.phase = 2;
			} else {
				//remove some nodes
				_.each(this.nodes, function(node) {
          if (!node.isMarked()) {
            return;
          }
					if (Math.random() < this.p) {
						msgs.push("Removing node: <span class=\"label\">" + node + "</span>");
						utils.removeNode(node);
					} else {
						node.unmark();
					}
				},
				this);

				this.phase = 1;
			}

			return msgs;
		},
		isDone: function() {
			return this.nodes.length === 0;
		},
		getResult: function() {
			return [Math.ceil(this.steps / 2)];
		}
	};

	return Simple;
});


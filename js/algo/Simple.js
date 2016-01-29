define(['_'], function(_) {
	var Simple = {
		nodes: null,
		i: null,

		init: function(nodes) {
			this.nodes = _.shuffle(nodes);
			this.i = [];
		},

		step: function(utils) {
      var msgs = [];
      var node = this.nodes.pop();

      msgs.push("Analyzing node: <span class=\"label\">"+node+"</span>.");
      var neighs = utils.getNeighbourhood(node);
      if (utils.isIntersectionEmpty(neighs, this.i)) {
        msgs.push("Adding node to set.");
        this.i.push(node);
        node.mark();
      } else {
        msgs.push("Neighbourhood is already in set. Skipping.");
      }
      return msgs;
		},
    isDone : function() {
      return this.nodes.length === 0;
    },
		getResult: function() {
			return this.i;
		}
	};

	return Simple;
});


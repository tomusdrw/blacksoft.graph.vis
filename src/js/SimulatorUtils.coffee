define ['_'], (_) ->
  class SimulatorUtils
     constructor: (@simulator) ->
       @system = @simulator.system
     removeNode: (node) ->
        @system.pruneNode(node.node)
     removeEdge: (edge) ->
        @system.pruneEdge(edge.edge)

     isIntersectionEmpty: (nodeSet1, nodeSet2) ->
        nodes1 = _.map nodeSet1, (node) -> node.node.name
        nodes2 = _.map nodeSet2, (node) -> node.node.name

        _.isEmpty(_.intersection(nodes1, nodes2))
     getNeighbourhood: (node) ->
        from = @system.getEdgesFrom(node.node)
        to = @system.getEdgesTo(node.node)

        # Now we have to convert this to nodes and remove duplicates
        nodes1 = _.map from, (edge) -> edge.target.obj
        nodes2 = _.map to, (edge) -> edge.source.obj
        # Return unique nodes from union of those two
        _.uniq (_.union nodes1, nodes2)

  return SimulatorUtils


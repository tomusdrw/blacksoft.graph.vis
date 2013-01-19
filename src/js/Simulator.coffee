define ['_', 'backbone', 'arbor'], (_, Backbone, arbor) ->
  class Node
    DEFAULTS: {
      size: 10
      borderWidth : 1
      borderColor: '#030'
      markedColor: '#f44'
      defaultColor: '#4f4'
    }
    constructor: (@system, @node) ->
      @node.color = @DEFAULTS.defaultColor
      @node.size = @DEFAULTS.size
      @node.borderWidth = @DEFAULTS.borderWidth
      @node.borderColor = @DEFAULTS.borderColor
      
    unmark: ->
      @node.color = @DEFAULTS.defaultColor
    mark: ->
      @node.color = @DEFAULTS.markedColor
  class Edge
     DEFAULTS : {
       size : 2
       color: '#222'
     }
     constructor : (@system, @edge) ->
       @edge.color = @DEFAULTS.color
       @edge.size = @DEFAULTS.size

   class Simulator extends Backbone.Model
     constructor: (@system) ->
       super()
       @system.eachNode (node)->
         node.obj = new Node(system, node)
       @system.eachEdge (edge) ->
         edge.obj = new Edge(system, edge)
     removeNode: (node) ->
        @system.pruneNode(node.node)
     removeEdge: (edge) ->
        @system.pruneEdge(edge.edge)
     getNodes : ->
        nodes = []
        @system.eachNode (node) ->
          nodes.push(node.obj)
        nodes
     getEdges : ->
        edges = []
        @system.eachEdge (edge) ->
          edges.push(edge.obj)
        edges
     isRunning: ->
        @get('running')
     start: (stepTime) ->
        stepTime ?= 1000
        @interval = window.setInterval(=>
          @step()
        , stepTime)
        @set('running', true)
     stop: ->
        window.clearInterval(@interval) if @interval?
        @set('running', false)
     step: ->
        msg = @algorithm.step(@getNodes(), @getEdges())
        @trigger('message', msg) if msg?


   return Simulator

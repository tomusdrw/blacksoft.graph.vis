define ['backbone', 'arbor', 'SimulatorUtils'], (Backbone, arbor, SimulatorUtils) ->
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
    toString : ->
      @node.name

  class Edge
     DEFAULTS : {
       size : 2
       color: '#222'
     }
     constructor : (@system, @edge) ->
       @edge.color = @DEFAULTS.color
       @edge.size = @DEFAULTS.size

  class Simulator extends Backbone.Model
     defaults : {
       step: 0
     }
     constructor: (@system, @algorithm) ->
       super()
       @system.eachNode (node)->
         node.obj = new Node(system, node)
       @system.eachEdge (edge) ->
         edge.obj = new Edge(system, edge)
       @utils = new SimulatorUtils(this)
       @algorithm.init(@getNodes(), @getEdges(), @utils)

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
          res = @step()
          if (res?)
            @trigger('message', "Algorithm finished with result: " + res)
            @stop()
        , stepTime)
        @set('running', true)
     stop: ->
        window.clearInterval(@interval) if @interval?
        @set('running', false)
     step: ->
        if @algorithm.isDone()
          @trigger('message', "Algorithm finished")
          return @algorithm.getResult()

        @set('step', @get('step') + 1)
        msg = @algorithm.step(@utils)
        @trigger('message', msg) if msg?
        if @algorithm.isDone() then @algorithm.getResult() else null


    return Simulator

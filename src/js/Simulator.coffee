define ['require', 'backbone', 'arbor', 'SimulatorUtils'], (require, Backbone, arbor, SimulatorUtils) ->
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
       running : false
       finished: false
     }
     constructor: (@graph, @system, @prefs) ->
       super()
       @utils = new SimulatorUtils(this)
       @graph.on('change', @newGraph, this)
       @prefs.on('change:algo', @loadAlgo, this)
       @loadAlgo()

     loadAlgo: ()->
      require ['algo/'+@prefs.get('algo')], (algo) =>
        @algorithm = algo
        @algorithm.init(@getNodes(), @getEdges(), @utils) if @algorithm?
        
     newGraph: ()->
       @system.eachNode (node)->
         node.obj = new Node(@system, node)
       @system.eachEdge (edge) ->
         edge.obj = new Edge(@system, edge)
       @algorithm.init(@getNodes(), @getEdges(), @utils) if @algorithm?
       @trigger('newGraph')

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
     isFinished: ->
        @get('finished')
     restart : ->
        @graph.reparse()
        # Soooo shitty!
        _.delay(=>
          @newGraph()
          @start()
        , 100)
     start: () ->
        if not @algorithm?
          throw Error("No algorithm!")
        @set('step', 0)
        @set('running', true)
        @set('finished', false)

        # Run in intervals
        @interval = window.setInterval(=>
          res = @step()
          if (res?)
            @stop()
        , @prefs.get('delay'))
     stop: ->
        window.clearInterval(@interval) if @interval?
        @set('running', false)
     step: ->
        if @algorithm.isDone()
          @set('finished', true)
          @trigger('message', "Algorithm finished with result: "+@algorithm.getResult())
          return @algorithm.getResult()

        @set('step', @get('step') + 1)
        msg = @algorithm.step(@utils)
        @trigger('message', msg) if msg?
        null


    return Simulator

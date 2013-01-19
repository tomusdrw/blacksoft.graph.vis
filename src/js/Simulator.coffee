define ['require', 'backbone', 'arbor', 'SimulatorUtils'], (require, Backbone, arbor, SimulatorUtils) ->
  class Node
    DEFAULTS: {
      size: 10
      borderWidth : 1
      borderColor: '#030'
      markedColor: '#f44'
      defaultColor: '#4f4'
    }
    constructor: (@system, @node, @utils) ->
      @node.data.color = @DEFAULTS.defaultColor
      @node.data.size = @DEFAULTS.size
      @node.data.borderWidth = @DEFAULTS.borderWidth
      @node.data.borderColor = @DEFAULTS.borderColor
      @marked = false
    unmark: ->
      @marked = false
      @node.data.color = @DEFAULTS.defaultColor
    mark: ->
      @marked = true
      @node.data.color = @DEFAULTS.markedColor
    isMarked : ->
      @marked
    getDegree : ->
      @utils.getDegree(this)
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
     from: ->
       @edge.source.obj
     to: ->
       @edge.target.obj

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
        @algorithm.init(@utils.getNodes()) if @algorithm?
        
     newGraph: ()->
       @system.eachNode (node) =>
         node.obj = new Node(@system, node, @utils)
       @system.eachEdge (edge) =>
         edge.obj = new Edge(@system, edge, @utils)
       @algorithm.init(@utils.getNodes()) if @algorithm?
       @trigger('newGraph')

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

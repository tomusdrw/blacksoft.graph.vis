define(['$', 'backbone'], function($, Backbone) {
	var PrefsView = Backbone.View.extend({
		el: '#preferences',
		events: {
			'change .select-delay': 'changeDelay',
			'change .select-algorithm': 'changeAlgo',
			'keyup .graph-input': 'changeGraph'
		},
		initialize: function() {
			this.model.on('change:graphError', this.graphError, this);
			this.model.on('change:delay', this.updateDelay, this);
			this.model.on('change:algo', this.updateAlgo, this);
			this.model.on('change:graphText', this.updateGraph, this);
			//update graph
			this.changeGraph = _.debounce(this.changeGraph, 1000);
		},
		updateAll: function() {
			this.updateDelay();
			this.updateAlgo();
			this.updateGraph();
		},
		updateDelay: function() {
			this.$('.select-delay').val(this.model.get('delay'));
		},
		updateAlgo: function() {
			this.$('.select-algorithm').val(this.model.get('algo'));
		},
		updateGraph: function() {
			this.$('.graph-input').val(this.model.get('graphText'));
		},
		graphError: function() {
			var error = this.model.get('graphError');
			this.$('.alert').text(error).toggleClass('in', !! error);
			this.$('.graph-input').parents('.control-group').toggleClass('error', !! error);
		},
		changeDelay: function() {
			var delay = parseInt(this.$('.select-delay').val(), 10);
			this.model.setDelay(delay);
		},
		changeAlgo: function() {
			var algo = this.$('.select-algorithm').val();
			this.model.setAlgo(algo);
		},
		changeGraph: function() {
			this.model.parseGraph($.trim(this.$('.graph-input').val()));
		}

	});

	return PrefsView;

});


define(['backbone'], function(Backbone) {
	var SimulatorView = Backbone.View.extend({
		el: '.nav',
		events: {
			'click .start': 'startSimulation',
			'click .stop': 'stopSimulation',
			'click .step': 'stepSimulation',
			'click .restart': 'restartSimulation',
			'click .graph': 'showResult'
		},

		initialize: function() {
			this.model.on('change:running', this.updateState, this);
			this.model.on('change:finished', this.updateState, this);
		},

		updateState: function() {
			var isRunning = this.model.isRunning();
			var isFinished = this.model.isFinished();

			this.$('.start').parent().toggleClass('hidden', isRunning || isFinished);
			this.$('.stop').parent().toggleClass('hidden', ! isRunning || isFinished);
			this.$('.step').parent().toggleClass('hidden', isFinished);
			this.$('.restart').parent().toggleClass('hidden', ! isFinished);
			this.$('.graph').parent().toggleClass('hidden', ! isFinished);
		},

		showResult: function() {
			this.model.showResult();
		},

		startSimulation: function() {
			var stepTime = 1000;
			this.model.start(stepTime);
		},
		stopSimulation: function() {
			this.model.stop();
		},
		stepSimulation: function() {
			this.model.step();
		},
		restartSimulation: function() {
			this.model.restart();
		}

	});

	return SimulatorView;
});


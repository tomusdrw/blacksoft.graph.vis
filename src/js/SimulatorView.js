define(['backbone'], function(Backbone) {
	var SimulatorView = Backbone.View.extend({
		el: '.nav',
		events: {
			'click .start': 'startSimulation',
			'click .stop': 'stopSimulation',
			'click .step': 'stepSimulation',
			'click .restart': 'restartSimulation'
		},

		initialize: function() {
			this.model.on('change:running', this.updateState, this);
		},

		updateState: function() {
			var isRunning = this.model.isRunning();

			this.$('.start').parent().toggleClass('hidden', isRunning);
			this.$('.stop').parent().toggleClass('hidden', ! isRunning);
		},

		startSimulation: function() {
			var stepTime = 1000;
      console.log(this.model);
			this.model.start(stepTime);
		},
		stopSimulation: function() {
			this.model.stop();
		},
		stepSimulation: function() {
			this.model.step();
		},
		restartSimulation: function() {
			window.location.reload();
		}

	});

	return SimulatorView;
});


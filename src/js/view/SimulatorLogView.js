define(['jquery', 'backbone', '_'], function($, Backbone, _) {

	var msgView = Backbone.View.extend({
		el: '.simulator-log',
		tpl: _.template('<p><span class="label label-info"><i class="icon icon-time"></i> <%= step %></span></p>'),
		initialize: function() {
			this.model.on('message', this.appendMessage, this);
			this.model.on('change:finished', this.clearLog, this);
			this.$el.empty();
		},

		clearLog: function(e, value) {
			if (!value) {
				this.$el.empty();
			}
		},

		appendMessage: function(msg) {
			if (!_.isArray(msg)) {
				msg = [msg];
			}
			var $div = $(this.tpl({
				step: this.model.get('step')
			}));

			_.each(msg, function(m) {
				$div.append("<div>" + m + "</div>");
			},
			this);

			this.$el.prepend($div);
		}

	});

	return msgView;

});


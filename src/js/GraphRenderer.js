define(['_', 'backbone.storage'], function(_, Backbone) {
	var Renderer = Backbone.Model.extend({
		particleSystem: null,
		canvas: null,
		ctx: null,

		initialize: function(canvas) {
			this.canvas = canvas;
			this.ctx = canvas.getContext('2d');
		},

		init: function(system) {
			this.particleSystem = system;
			system.screenSize(this.canvas.width, this.canvas.height);
		},
		getSystem: function() {
			return this.particleSystem;
		},
		redraw: function() {
			var ctx = this.ctx;

			ctx.fillStyle = "#fff";
			ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

			this.particleSystem.eachEdge(function(edge, pt1, pt2) {
				ctx.strokeStyle = edge.color || "#222";
				ctx.lineWidth = edge.size || 1;
				ctx.beginPath();
				ctx.moveTo(pt1.x, pt1.y);
				ctx.lineTo(pt2.x, pt2.y);
				ctx.stroke();
			});

			this.particleSystem.eachNode(function(node, pt) {
				var r = node.size || 10;

				ctx.beginPath();
				ctx.arc(pt.x, pt.y, r, 0, 2 * Math.PI, false);
				ctx.fillStyle = node.color || "#4f4";
				ctx.fill();
				ctx.lineWidth = node.borderWidth || 1;
				ctx.strokeStyle = node.borderColor || '#003300';
				ctx.stroke();
				ctx.fillStyle = '#222';
				ctx.font = "bold 10px Verdana"
				ctx.textBaseline = "top";
				ctx.fillText(node.name, pt.x - r / 4, pt.y - r / 2);
			});
		}
	});

	return Renderer;
});


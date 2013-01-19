var require = {
	baseUrl: 'js',
	paths: {
		'bootstrap': 'vendor/bootstrap-2.2.2',
		'underscore': 'vendor/underscore-1.4.3',
		'backbone': 'vendor/backbone-0.9.9',
		'backbone.storage': 'vendor/backbone.localStorage',
		'arbor': 'vendor/arbor-tween'
	},
	map: {
		'*': {
			'_': 'underscore',
			'$': 'jquery'
		}
	},
	shim: {
		'underscore': {
			exports: '_'
		},
		'backbone': {
			deps: ['underscore'],
			exports: 'Backbone'
		},
		'arbor': {
			exports: 'arbor',
      deps: ['vendor/arbor']
		}
	}
};


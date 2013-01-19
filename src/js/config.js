var require = {
	baseUrl: 'js',
	paths: {
		'bootstrap': 'vendor/bootstrap-2.2.2',
		'underscore': 'vendor/underscore-1.4.3',
		'backbone': 'vendor/backbone-0.9.9',
		'backbone.storage': 'vendor/backbone.webStorage',
		'arbor': 'vendor/arbor'
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
		'backbone.storage': {
			deps: ['backbone'],
			exports: 'Backbone'
		},
    'vendor/arbor-tween' : {
      deps: ['jquery']
    },
		'arbor': {
			exports: 'arbor',
      deps: ['vendor/arbor-tween']
		}
	}
};


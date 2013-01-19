#blacksoft.template#
==================

##Template for web applications##

###Includes###
* Twitter Bootstrap,
* Font Awesome,
* Underscore.js,
* Backbone.js,
* Require.js,
* Modernizr.

###Unit testing###
There is also unit testing framework:
* Mocha
* with Chai assertions library

###Application linting and building###
Build process is maintained by grunt and includes:
* Quality tasks
  * JSHint linter
  * CSSlint
  * Code metrics using complexity plugin (Halstead and Cyclomatic metrics)
* Building
  * r.js optimization of main module
  * JS minimization and concatenation (require.js config, library and main module)
  * CSS minimization and concatenation

####Required npm modules####
* grunt-requirejs
* grunt-mocha
* grunt-useref
* grunt-complexity

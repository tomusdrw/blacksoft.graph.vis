define([], function() {
  var utils = {
    addEdge: function(system, a, b) {
      system.addEdge(a, b);
      system.addEdge(b, a);
    }
  };


  return utils;
});

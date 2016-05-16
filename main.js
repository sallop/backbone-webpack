var Backbone = require('backbone');
var $ = require('jquery');


var AppView = Backbone.View.extend({
  el: '#container',
  initialize: function(){
    this.render();
  },
  render: function(){
    this.$el.html("Hello World");
    //this.el.html("Hello World");
  }
});

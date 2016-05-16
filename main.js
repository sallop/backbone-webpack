//var $ = require('jquery');
//var json2 = require('json2');
var _ = require('underscore');
var Backbone = require('backbone');


var AppView = Backbone.View.extend({
  el: '#container',
  initialize: function(){
    this.render();
  },
  render: function(){
    this.$el.html("Hello World!");
    //this.el.html("Hello World");
  }
});

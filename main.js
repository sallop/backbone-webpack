// http://stackoverflow.com/questions/28969861/managing-jquery-plugin-dependency-in-webpack
// there is no need if you use webpack.ProvidePlugin
//var $ = require('jquery');
//var json2 = require('json2');
//var _ = require('underscore');
//var Backbone = require('backbone');

var AppView = Backbone.View.extend({
  el: $('#container'),
  template: _.template("<h3>Hello <%= who %></h3>"),
  initialize: function(){
    console.log("Backbone is called");
    this.render();
  },
  render: function(){
    //this.$el.html("Hello World!");
    this.$el.html(this.template({ who: 'World!'}));
    //this.el.html("Hello World");
  }
});
// Initializers
var appView = new AppView();

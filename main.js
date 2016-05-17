// http://stackoverflow.com/questions/28969861/managing-jquery-plugin-dependency-in-webpack
// there is no need if you use webpack.ProvidePlugin
//var $ = require('jquery');
//var json2 = require('json2');
//var _ = require('underscore');
//var Backbone = require('backbone');
var scores = [84, 99, 91, 65, 87, 55, 72, 68, 95, 42],
    topScores = [], scoreLimit = 90;
$(document).ready(function(){
  $("p").click(function(){
    topScores = _.select(scores, function(score){ return score > scoreLimit; });
    console.log(topScores);

    $(this).hide();
  });
});

var AppView = Backbone.View.extend({
  el: '#container',
  initialize: function(){
    console.log("Backbone is called");
    this.render();
  },
  render: function(){
    this.$el.html("Hello World!");
    //this.el.html("Hello World");
  }
});

var appView = new AppView();

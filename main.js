// http://stackoverflow.com/questions/28969861/managing-jquery-plugin-dependency-in-webpack
// there is no need if you use webpack.ProvidePlugin
//var $ = require('jquery');
//var json2 = require('json2');
//var _ = require('underscore');
//var Backbone = require('backbone');
//Backbone.LocalStorage = require('backbone-localstorage'); // this is another library.
//Backbone.LocalStorage = require('backbone.localstorage'); // I need this one.

console.log( Backbone.LocalStorage );

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
    //this.$el.html("Hello World!");
    //this.el.html("Hello World");
  }
});

var app = {}; // create namespace for our app
app.Todo = Backbone.Model.extend({
  defaults: {
    title: '',
    completed: false
  }
});

var todo = new app.Todo({ title: 'Learn Backbone'});
todo.get('title');
todo.get('completed');
todo.get('created_at');
todo.get('created_at', Date());
todo.get('created_at');

app.TodoList = Backbone.Collection.extend({
  model: app.Todo,
  //localStorage: new Backbone.LocalStorage('backbone-todo')
  localStorage: new Store('backbone-todo')
});
app.todoList = new app.TodoList();
// Initializers
var appView = new AppView();

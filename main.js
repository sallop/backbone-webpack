// http://stackoverflow.com/questions/28969861/managing-jquery-plugin-dependency-in-webpack
// there is no need if you use webpack.ProvidePlugin
//var $ = require('jquery');
//var json2 = require('json2');
//var _ = require('underscore');
//var Backbone = require('backbone');
////Backbone.LocalStorage = require('backbone-localstorage'); // this is another library.
Backbone.LocalStorage = require('backbone.localstorage'); // I need this one.

//var AppView = Backbone.View.extend({
//  el: $('#container'),
//  template: _.template("<h3>Hello <%= who %></h3>"),
//  initialize: function(){
//    console.log("Backbone is called");
//    this.render();
//  },
//  render: function(){
//    //this.$el.html("Hello World!");
//    this.$el.html(this.template({ who: 'World!'}));
//    //this.$el.html("Hello World!");
//    //this.el.html("Hello World");
//  }
//});

var app = {}; // create namespace for our app
app.Todo = Backbone.Model.extend({
  defaults: {
    title: '',
    completed: false
  }
});

var todo = new app.Todo({ title: 'Learn Backbone', completed: false});
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
// instance of the Collection
app.todoList = new app.TodoList();

// var todoList = new app.TodoList();
// todoList.create({ title: 'Learn Backbone\'s Collection'});
// var lmodel = new app.Todo({ title: 'Learn Models', completed: true});
// todoList.add(lmodel);
// todoList.pluck('title');
// todoList.pluck('completed');
// console.log( JSON.stringify(todoList));

// renders individual todo items list (li)
app.TodoView = Backbone.View.extend({
  tagName: 'li',
  template: _.template($('#item-template').html()),
  render: function(){
    this.$el.html(this.template(this.model.toJSON()));
    this.input = this.$('.edit');
    return this; // enable chained calls
  },
  initialize: function(){
    this.model.on('change', this.render, this);
    this.model.on('destroy', this.remove, this);
  },
  events: {
    'dblclick label': 'edit',
    'keypress .edit': 'updateOnEnter',
    'blur .edit': 'close',
    'click .toggle': 'toggleCompleted',
    'click .destroy': 'destroy'
  },
  edit: function(){
    this.$el.addClass('editing');
    this.input.focus();
  },
  close: function(){
    var value = this.input.val().trim();
    if(value){
      this.model.save({title: value});
    }
    this.$el.removeClass('editing');
  },
  updateOnEnter: function(e){
    if(e.which == 13){
      this.close();
    }
  },
  toggleCompleted: function(){
    this.model.toggle();
  },
  destroy: function(){
    this.model.destroy();
  }
});

// renders the full list of todo items calling TodoView for each one.
app.AppView = Backbone.View.extend({
  el: '#todoapp',
  initialize: function(){
    this.input = this.$('#new-todo');
    // Whe new elements are added to the collection to the render then with addOne
    app.todoList.on('add', this.addOne, this);
    app.todoList.on('reset', this.addAll, this); // Loads list from local storage
    app.todoList.fetch();
  },
  events: {
    'keypress #new-todo': 'createTodoOnEnter'
  },
  createTodoOnEnter: function(e){
    if ( e.which !== 13 || !this.input.val().trim() ){
      return;
    }
    app.todoList.create(this.newAttributes());
    this.input.val(''); // clean input box
  },
  addOne: function(todo){
    var view = new app.TodoView({model: todo});
    $('#todo-list').append(view.render().el);
  },
  addAll: function(todo){
    this.$('#todo-list').html(''); // clean the todo list
    app.todoList.each(this.addOne, this);
  },
  newAttributes: function(){
    return {
      title: this.input.val().trim(),
      completed: false
    }
  }
});

// Initializers
//var appView = new AppView();
app.appView = new app.AppView();

// http://stackoverflow.com/questions/28969861/managing-jquery-plugin-dependency-in-webpack
// there is no need if you use webpack.ProvidePlugin
//var $ = require('jquery');
//var json2 = require('json2');
//var _ = require('underscore');
Backbone.LocalStorage = require("backbone.localstorage");

var app = {}; // namespace for our application
app.Monkey = Backbone.Model.extend({
  defaults: {
    id: '',
    team: '',
    name: '',
    christian_name: '',
    birthday: ''
  }
});

app.Monkeys = Backbone.Collection.extend({
  model: app.Monkey,
  localStorage: new Store("monkeys"),
  //comparator: 'birthday'
});

// instance of Collection
//app.monkeys = new app.Monkeys();
app.monkeys = new app.Monkeys([
    {
      id: 1,
      team: 1,
      name: 'Sputnik',
      christian_name: '',
      birthday: '1957/10/04'
    },{
      id: 2,
      team: 1,
      name: 'Laika',
      christian_name: '',
      birthday: '1957/11/03'
    },{
      id: 3,
      team: 1,
      name: 'Albert',
      christian_name: 'V2',
      birthday: '1949/01/14'
    }
]);

var MonkeyView = Backbone.View.extend({
  el: $('#monkey'),
  template: _.template(
    "<table>" +
    "<tr>" +
    "<td>  id: <%= id %></td>" +
    "<td>  team: <%= team %></td>" +
    "<td>name: <%= name %></td>"+
    "<td>  christian_name: <%= christian_name %></td>" +
    "<td>  birthday: <%= birthday %></td>" +
    "</tr>" +
    "</table>"
    ),
  // initialize: function(){
  //   var names = app.monkeys.pluck('name');
  //   console.log("Backbone is called");
  //   console.log( names );

  //   this.render();
  // },
  render: function(){
    console.log("MonkeyView.render')");
    //var monkey = this.model.get('name');
    var monkey = this.model.toJSON();
    // var monkey = app.monkeys.get(1).toJSON();
    //console.log( this.model );
    console.log( monkey );
    this.$el.html(this.template(monkey));
    return this; // enable chained calls
  }
});

var AppView = Backbone.View.extend({
  el: $('#app'),
  //className: '.foobar',
  template: _.template("<h1><%= app %>"),
  initialize: function(){
    console.log("AppView instantinated");
    this.render();
  },
  render: function(){
    // this.$el.html(this.template({app:"Application View"}));
    //app.monkeys.each(this.addOne, this);
    this.addAll();
    return this;
  },
  addOne: function(monkey){
    console.log("addOne called");
    console.log( monkey );
    console.log( monkey.toJSON());
    var view = new MonkeyView({model: monkey});
    $('#monkey-list').append( view.render().el );
  },
  addAll: function(){
    console.log("addAll call");
    this.$('#monkey-list').html(''); // clean the todo list
    // switch( window.filter ){}
    _.each(app.monkeys.addOne, this);
    console.log("addAll called");
  }
});
// Initializers
var AppView = new AppView();
var monkeyView = new MonkeyView();

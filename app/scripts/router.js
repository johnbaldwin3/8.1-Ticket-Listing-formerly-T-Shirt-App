var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');

var MainStoreContainer = require('./components/shop.jsx').MainStoreContainer;

var CartContainer = require('./components/cart.jsx').CartContainer;



var StoreAppRouter = Backbone.Router.extend({
  routes: {
    '': 'index',
    'cart': 'cart'

  },
  index: function() {
    ReactDOM.render(
      React.createElement(MainStoreContainer),
      document.getElementById('app')
    );

  },
  cart: function() {
    ReactDOM.render(
      React.createElement(CartContainer),
      document.getElementById('app')
    )
  }

});

var storeAppRouter = new StoreAppRouter();

module.exports = storeAppRouter;

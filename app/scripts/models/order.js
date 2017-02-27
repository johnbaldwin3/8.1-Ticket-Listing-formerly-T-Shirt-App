var Backbone = require('backbone');
Backbone.LocalStorage = require("backbone.localstorage");

var TicketOrderItem = Backbone.Model.extend({
  defaults: {
    bandName: '',
    venue: '',
    price: '',
    deal: '',
    qty: ''
  }
});

var TicketOrderCollection = Backbone.Collection.extend({
  model: TicketOrderItem,
});

var Order = Backbone.Model.extend({
  defaults: function(){
    return {
      name:'',
      items: new TicketOrderCollection()
    }
  },
  localStorage: new Backbone.LocalStorage("Order"),

});
var OrderCollection = Backbone.Collection.extend({
  model: TicketOrderItem,



});


module.exports = {

  TicketOrderItem,
  OrderCollection,
  Order,
  TicketOrderCollection
}

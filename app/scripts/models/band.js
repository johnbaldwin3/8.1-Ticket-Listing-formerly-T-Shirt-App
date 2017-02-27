var Backbone = require('backbone');
Backbone.LocalStorage = require("backbone.localstorage");

var Band = Backbone.Model.extend({
  defaults: {
    bandName: '',
    description: '',
    bandPhoto: '',
    venue: ''

  }


});

var BandCollection = Backbone.Collection.extend({
  model: Band,



});


module.exports = {

  Band,
  BandCollection
}

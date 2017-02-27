var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
//var Backbone = require('backbone');

var BandCollection = require('../models/band.js').BandCollection;
var Order = require('../models/order.js').Order;
var TicketOrderItem = require('../models/order.js').TicketOrderItem;

class MainStoreContainer extends React.Component {

  constructor(props) {
    super(props);
    var bandCollection = new BandCollection();
    bandCollection.add([
      {'bandName': 'DeathByButterflies', 'description': 'A heavy metal band born twenty years too late, bring your carton of Camels, your favorite brand of tallboy, and get ready to melt your face off and rock your cutoff jean shorts to the acid washed core.', 'bandPhoto':'https://images.pexels.com/photos/92080/pexels-photo-92080.jpeg?w=940&h=650&auto=compress&cs=tinysrgb' },
      {'bandName': "Dylan ", 'description': '(pronounced "Dye-Lahn"): A rap icon of Northern Greenville district 48 near Twin Pines Subdivision, one of the 5 greatest rappers of all time (according to Dave Chappelle) known in almost every block of his suburban neighborhood, ready to drop the mic at will...and he probably will.', 'bandPhoto':'https://images.pexels.com/photos/51044/pexels-photo-51044.jpeg?w=940&h=650&auto=compress&cs=tinysrgb' },
      {'bandName': "Whiskey and Dogs", 'description': 'The one and only legendary country sensation, known for such hits as: "I Lost My Dog, My Wife, and My Car, In the Same Day" or the sensational "My Truck Broke Down But I Still Made it to the Liqour Store (and Got Drunk)"', 'bandPhoto':'https://images.pexels.com/photos/167471/pexels-photo-167471.jpeg?w=940&h=650&auto=compress&cs=tinysrgb' }


    ]);

    var order = new Order();

    this.state = {
      bandCollection,
      order
    }

  }
  // //addTicketsToOrder(event){
  //   //console.log('tickItem', ticketItem);
  //   var numOfTickets = event.target.value;
  //   console.log('tickets', numOfTickets);
  //   //this.order.items.setState({'qty': numOfTickets});
  // }
  // //submitOrder(band){
  //   event.preventDefault();
  // console.log('clicked');
  // console.log(band);
  //
  // }
  render() {

    return(
      <div className="wrapper">
          <nav className="navbar navbar-default">
            <div className="container-fluid">
              <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="">TicketCentral.com</a>
              </div>
              <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul className="nav navbar-nav">
                  <li className="active" ><a href="#">Concert Tickets  <span className="sr-only">(current)</span></a></li>
                  <li><a href="#cart"> Your Cart</a></li>
                </ul>
              </div>
          </div>
        </nav>
        <div className="container-fluid">
          <div className="band-image-banner"></div>
        </div>

      <div className="container">
        <div className="row">
          <BandListItem
            bandCollection={this.state.bandCollection}/>
        </div>
      </div>
    </div>
  );

  }
}

class BandListItem extends React.Component {

  constructor(props) {
    super(props);
    var ticketOrderItem = new TicketOrderItem();
    //console.log('tickoritem', ticketOrderItem);
    this.state = {
      ticketOrderItem
    }
  }
  addTicketsToOrder(event) {
    //var tickOrdItem = this.state.ticketOrderItem;
    //console.log(tickOrdItem, 'tick');
    var numOfTickets = event.target.value;
    console.log('numoftick', numOfTickets);
    //this.ticketOrderItem.setState({'qty': numOfTickets});
    //console.log(this.ticketOrderItem);
  }
  getBand(band) {
    event.preventDefault();
    //var tickNum = this.addTicketsToOrder();
    console.log('band', band);
  }
  completeOrder() {
    console.log('ran');
  }
  render() {
    var bandList = this.props.bandCollection.map(band => {
      return (
        <div key={band.cid} className="col-sm-6 col-md-4">
          <div className="thumbnail">
            <img src={band.get('bandPhoto')}alt="..." />
            <div className="caption">
              <h3>{band.get('bandName')}</h3>
              <p>{band.get('description')}</p>
              <form onSubmit={this.completeOrder} className="ticket-order-form">
              <p><input onChange={this.addTicketsToOrder} type="number" step="1" className="form-control" max="10" min="1" id="ticket-qty" value={this.props.order} placeholder="Number of Tickets" /></p>
              <p><a type="submit" onClick={() => {this.getBand(band)}} href="#" className="btn btn-primary" role="button">Add Tickets To Cart</a></p>
              </form>
            </div>
          </div>
        </div>
      )
    })
    return(
      <div className="col-md-12">
        <div className="band-tickets">
          <div className="row">
            {bandList}
          </div>
        </div>
      </div>
    )
  }

}


module.exports = {
  MainStoreContainer
};

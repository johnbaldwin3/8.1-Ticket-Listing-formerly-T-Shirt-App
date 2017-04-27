var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
//var Backbone = require('backbone');

var BandCollection = require('../models/band.js').BandCollection;
var Order = require('../models/order.js').Order;
var TicketOrderItem = require('../models/order.js').TicketOrderItem;
var TicketOrderCollection = require('../models/order.js').TicketOrderCollection;

class MainStoreContainer extends React.Component {

  constructor(props) {
    super(props);
    var bandCollection = new BandCollection();
    bandCollection.add([
      {'bandName': 'DeathByButterflies', 'description': 'A heavy metal band born twenty years too late, bring your carton of Camels, your favorite brand of tallboy, and get ready to melt your face off and rock your cutoff jean shorts to the acid washed core.', 'bandPhoto':'https://images.pexels.com/photos/92080/pexels-photo-92080.jpeg?w=940&h=650&auto=compress&cs=tinysrgb', 'price': 300.00, 'venue': 'GottRocks'},
      {'bandName': "Dylan ", 'description': '(pronounced "Dye-Lahn"): A rap icon of Northern Greenville district 48 near Twin Pines Subdivision, one of the 5 greatest rappers of all time (according to Dave Chappelle) known in almost every block of his suburban neighborhood, ready to drop the mic at will...and he probably will.', 'bandPhoto':'https://images.pexels.com/photos/51044/pexels-photo-51044.jpeg?w=940&h=650&auto=compress&cs=tinysrgb', 'price': 2500.00, 'venue': 'Bert\'s Local Mart', },
      {'bandName': "Whiskey and Dogs", 'description': 'The one and only legendary country sensation, known for such hits as: "I Lost My Dog, My Wife, and My Car, In the Same Day" or the sensational "My Truck Broke Down But I Still Made it to the Liquor Store (and Got Drunk)"', 'bandPhoto':'https://images.pexels.com/photos/167471/pexels-photo-167471.jpeg?w=940&h=650&auto=compress&cs=tinysrgb','price': 12.00, 'venue': 'Bilo-Center' }


    ]);

    var order = new Order();

    this.state = {
      bandCollection,
      order
    }

  }

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
                  <li><a href="#cart"> Your Cart <span className="badge">4</span> </a></li>
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
            bandCollection={this.state.bandCollection}
            order={this.state.order}/>
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
    var ticketOrderCollection = new TicketOrderCollection();
    var order = new Order();
    ticketOrderItem.set({deal: .05, id: ''});
    //console.log('tickoritem', ticketOrderItem);
    this.getQty = this.getQty.bind(this);
    //this.getBand = this.getBand.bind(this);
    this.state = {
      ticketOrderItem,
      order,
      ticketOrderCollection
    };
  }
  getQty(e) {
    e.preventDefault();
    var qty = e.target.value;
    this.state.ticketOrderItem.set({qty: qty});
    this.setState({qty: qty});
    console.log('target', qty);
  }
  completeOrder(band, price, id, venue) {
    //console.log(id);
    console.log(this.state.ticketOrderItem);
    this.state.ticketOrderItem.set({bandName: band, price: price, venue: venue});
     var orderedItem = this.state.ticketOrderItem;

    this.state.ticketOrderCollection.add([orderedItem]);
    var tstoc = this.state.ticketOrderCollection;
    localStorage.setItem('tickets', JSON.stringify(tstoc.toJSON()));

  }
  render() {
    var bandList = this.props.bandCollection.map(band => {
      return (
        <div key={band.cid} className="col-sm-6 col-md-4">
          <div className="thumbnail">
            <img src={band.get('bandPhoto')}alt="..." />
            <div className="caption">
              <h3>{band.get('bandName')}</h3>
              <h4> Live at: {band.get('venue')}</h4>
              <p>{band.get('description')}</p>
              <p> Normal Price: $ {band.get('price') } per ticket.</p>
              <form onSubmit={(e) => { e.preventDefault();  this.completeOrder(
                  band.get('bandName'), band.get('price'),
                  band.get('cid'),
                  band.get('venue')
                 )}} className="ticket-order-form">
                <p>
                  <input onChange={this.getQty} type="number" step="1" className="form-control" max="10" min="1" id="ticket-qty" value={this.ticketOrderItem} placeholder="Number of Tickets" />
                </p>
                <p>
                  <button type="submit" className="btn btn-success">Add to Your Cart</button>
                </p>
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

var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');

class CartContainer extends React.Component {

render() {
    var orderItems = JSON.parse(localStorage.getItem('tickets'));
    console.log(orderItems, 'oI');

    var orderedTickets = orderItems.map((ticketOrder)=> {
      console.log(ticketOrder, 'ticketORder');
      return (
        <tr key={ticketOrder.cid}>
          <td>{ticketOrder.bandName}</td>
          <td>{ticketOrder.venue}</td>
          <td><s>$ {(ticketOrder.price).toFixed(2)}</s></td>
          <td>$ {(ticketOrder.price - (ticketOrder.deal * ticketOrder.price)).toFixed(2)}</td>
          <td>{ticketOrder.qty}</td>
          <td>expiration time here</td>
          <td><button>remove ticket button</button> </td>
        </tr>
      )
    });
  return (
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
              <li><a href="#">Concert Tickets</a></li>
              <li className="active"><a href="#cart"> Your Cart <span className="sr-only">(current)</span></a></li>
            </ul>
          </div>
      </div>
    </nav>
    <div className="container-fluid">
      <div className="band-image-banner"></div>
    </div>
    <div className= "container">
      <div className="panel panel-default">
      <div className="panel-heading">TicketCentral.com Cart:</div>
      <div className="panel-body">
        <p>Be sure to complete your selection before the deals expire, or you will probably lose your tickets to some other sap willing to pay these ridiculous "sale" prices! HURRY UP AND BUY BEFORE IT'S TOO LATE!</p>
      </div>
      <table className="table table-hover table-striped">
        <thead className="table-header">
          <tr>
            <th>Concert:</th>
            <th>Venue:</th>
            <th>Original Price:</th>
            <th>Deal Price:</th>
            <th>Quantity:</th>
            <th>This Deal Expires in:</th>
            <th>Remove Tickets</th>
          </tr>
        </thead>
        <tbody className="checkout-body">
          {orderedTickets}
        </tbody>
      </table>
    </div>

    </div>
  </div>

    );
  }
}

module.exports = {
  CartContainer
};

/* eslint-disable node/handle-callback-err */
import React from 'react';

export default class GameSearch extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePriceFloorChange = this.handlePriceFloorChange.bind(this);
    this.handlePriceCeilingChange = this.handlePriceCeilingChange.bind(this);
    this.fetchFaves = this.fetchFaves.bind(this);

  }

  fetchFaves() {
    fetch('/api/faveids')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw response;
        }
      })
      .then(data => this.props.parentChangeFavesArray(data));
  }

  fetchReq() {
    let priceFloor;
    if (!this.props.parentPriceFloor) {
      priceFloor = '0';
    } else {
      priceFloor = this.props.parentPriceFloor;
    }

    let priceCeiling;
    if (!this.props.parentPriceCeiling) {
      priceCeiling = '60';
    } else {
      priceCeiling = this.props.parentPriceCeiling;
    }

    const fetchURL = 'https://www.cheapshark.com/api/1.0/deals?title=' + this.props.parentSearchTerm + '&lowerPrice=' + priceFloor + '&upperPrice=' + priceCeiling;
    fetch(fetchURL)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something went wrong');
        }
      })
      .then(data => this.props.parentChangeResultsArray(data))
      .catch(error => {
        this.goToErrorPage();
      });
    this.goToResults();

  }

  goToResults() {
    window.location.hash = 'gameSearchResults';
  }

  goToErrorPage() {
    window.location.hash = 'errorPage';
  }

  handleChange(event) {
    const currentSearchTerm = event.target.value;
    this.props.parentChangeSearchTerm(currentSearchTerm);
  }

  handlePriceFloorChange(event) {
    const currentPriceFloor = event.target.value;
    this.props.parentChangePriceFloor(currentPriceFloor);
  }

  handlePriceCeilingChange(event) {
    const currentPriceCeiling = event.target.value;
    this.props.parentChangePriceCeiling(currentPriceCeiling);
  }

  handleSubmit(event) {
    this.fetchFaves();
    this.fetchReq();
    event.preventDefault();
  }

  render() {
    return (
      <div className="container">
        <div className="header">
          <h1 className="title">Frugal Frames</h1>
          <h2 className="title">Find deals on digital PC games!</h2>
        </div>

        <div className="topOptions">
          <h3 className="find">Find: </h3>
          <a href="#gameSearch" className="topButtonActive">GAMES</a>
          <a href="#myList" className="topButton">MY LIST</a>
        </div>
        <form onSubmit={this.handleSubmit} className= "gameSearchForm">

          <div className = "row searchRow">
            <label htmlFor="nameSearchBox">Name:</label>
            <input type="text" id="nameSearchBox" value={this.props.parentSearchTerm} onChange={this.handleChange}></input>
          </div>
          <div className = "row searchRow">
            <label htmlFor="priceFloorBox">Minimum Price:</label>
            <input type="number" id="priceFloorBox" value={this.props.parentPriceFloor} onChange={this.handlePriceFloorChange} min="0"></input>
          </div>
          <div className="row searchRow">
            <label htmlFor="priceCeilingBox">Maximum Price:</label>
            <input type="number" id="priceCeilingBox" value={this.props.parentPriceCeiling} onChange={this.handlePriceCeilingChange} min="1"></input>
          </div>
          <div className = "row searchRow">
            <button className="searchButton">SEARCH</button>
          </div>

        </form>
        <div>

        </div>
      </div>
    );
  }
}

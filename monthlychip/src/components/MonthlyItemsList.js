import React, { Component } from "react";
import "../scss/main.scss";
import axios from "axios";

const API_URL = "http://localhost:3000/items";

export default class MonthlyItemsList extends Component {
  container = React.createRef();
  state = {
    open: false,
    items: [],
    query: "",
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
    axios.get(`${API_URL}`).then((res) => {
      const items = res.data;
      this.setState({ items });
      console.log("heyy", items);
    });
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handlButtonClick = () => {
    this.setState((state) => {
      return { open: !state.open };
    });
  };

  handleClickOutside = (event) => {
    if (
      this.container.current &&
      !this.container.current.contains(event.targer)
    ) {
      this.setState({
        open: false,
      });
    }
  };

  render() {
    const { items } = this.state;
    return (
      <div className="container" ref={this.container}>
        <div className="container">
          <button
            type="button"
            className="button"
            onClick={this.handlButtonClick}
          >
            ☰
          </button>
          {this.state.open && (
            <div className="dropdown">
              {items.data.map(function (item, key) {
                return <li key={key}> {item.itemName}</li>;
              })}
            </div>
          )}
        </div>
      </div>
    );
  }
}

import React, { Component } from "react";
import "../scss/main.scss";

export default class MonthlyItemsList extends Component {
  container = React.createRef();
  state = {
    open: false,
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
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
              <ul>
                <li>Option 1</li>
                <li>Option 2</li>
                <li>Option 3</li>
                <li>Option 4</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  }
}

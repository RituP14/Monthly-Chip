import React, { Component } from "react";
import "../scss/main.scss";
import axios from "axios";

const API_URL = "http://localhost:3000/items";

export default class MonthlyItemsList extends Component {
  container = React.createRef();
  state = {
    open: false,
    items: [],
    fields: {
      name: "",
      amount: "",
      description: "",
    },
    errors: {
      name: "",
      amount: "",
      description: "",
    },
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
    axios.get(`${API_URL}`).then((res) => {
      const items = res.data;
      this.setState({ items });
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

  onChange(field, e) {
    let fields = this.state.fields;
    fields[field] = e.target.value;
    this.setState({ fields });
  }

  onSubmit = (e) => {
    // get our form data out of state
    const fields = this.state.fields;
    const body = fields;

    axios.post("http://localhost:3000/items", body).then((result) => {
      //access the results here....
      this.setState({
        fields: {
          name: "",
          amount: "",
          description: "",
        },
      });
      alert("you are successfully submitted the form!!");
    });
  };

  render() {
    const { items } = this.state;
    const fields = this.state.fields;
    return (
      <div className="container m-4" ref={this.container}>
        <form onSubmit={this.onSubmit.bind(this)}>
          <div className="row mb-4">
            <div className="col-md-6 select-container">
              <label>Select Item</label>
              <select>
                {items.data &&
                  items.data.map(function (item, key) {
                    return (
                      <option key={key} value={item.itemName}>
                        {item.itemName}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="col-md-6">
              <label htmlFor="inputName">Enter Amount in Euro</label>
              <input
                type="text"
                className="form-control"
                name="amount"
                placeholder="Enter amount"
                onChange={this.onChange.bind(this, "amount")}
                value={fields.amount}
              />
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-md-6">
              <label htmlFor="inputName">Enter Description</label>
              <input
                type="text"
                className="form-control"
                name="description"
                placeholder="Enter description"
                onChange={this.onChange.bind(this, "description")}
                value={fields.description}
              />
            </div>
            <div className="col-md-6"></div>
          </div>
          <div className="col-md-6">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

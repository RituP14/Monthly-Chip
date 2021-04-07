import React, { Component } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../scss/main.scss";
import axios from "axios";

const API_URL = "http://localhost:3000/items";

export default class MonthlyItemsList extends Component {
  container = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      items: [],
      value: "coconut",
      date: moment().toDate(),
      fields: {
        item_name: "",
        item_amount: "",
        description: "",
      },
      errors: {
        item_name: "",
        item_amount: "",
        description: "",
      },
    };
    this.dateChanged = this.dateChanged.bind(this);
  }

  componentDidMount() {
    axios.get(`${API_URL}`).then((res) => {
      const items = res.data;
      this.setState({ items });
    });
  }

  handleValidation() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    //Name
    if (!fields.description) {
      formIsValid = false;
      errors["description"] = "Cannot be empty";
    }
    this.setState({ errors: errors });
    return formIsValid;
  }

  contactSubmit(e) {
    e.preventDefault();
    if (this.handleValidation()) {
      this.onSubmit();
    } else {
      alert("Please fill the form.");
    }
  }

  onChange(field, e, date) {
    let fields = this.state.fields;
    fields[field] = e.target.value;
    this.setState({ fields });
  }

  dateChanged(date) {
    this.setState({ date: date });
  }
  onSubmit = (e, date) => {
    // get our form data out of state
    const body = {
      item_name: this.state.fields.item_name,
      item_amount: this.state.fields.item_amount,
      description: this.state.fields.description,
      date: this.state.date,
    };

    this.setState({
      date: date,
      fields: {
        item_name: "",
        item_amount: "",
        description: "",
      },
    });
    console.log("Date", this.state);
    axios.post("http://localhost:3000/items", body).then((result) => {
      //access the results here....
      alert("you are successfully submitted the form!!");
    });
  };

  render() {
    const { items } = this.state;
    const fields = this.state.fields;

    return (
      <div className="container m-4" ref={this.container}>
        <form onSubmit={this.contactSubmit.bind(this)}>
          <div className="row mb-4">
            <div className="col-md-6 select-container">
              <label>Select Item</label>
              <select
                className="custom-select"
                value={fields.item_name}
                onChange={this.onChange.bind(this, "item_name")}
              >
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
                name="item_amount"
                placeholder="Enter amount"
                onChange={this.onChange.bind(this, "item_amount")}
                value={fields.item_amount}
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
            <div className="col-md-6">
              <DatePicker
                selected={this.state.date}
                onChange={this.dateChanged}
                value={this.state.date}
                placeholderText="Select date"
                dateFormat="dd-MM-yyyy"
              />
            </div>
          </div>
          <div className="col-md-6">
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

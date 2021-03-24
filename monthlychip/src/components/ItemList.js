import React, { Component } from "react";
import "../scss/main.scss";
import axios from "axios";

const API_URL = "http://localhost:3000/itemList";

export default class MonthlyItemsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemList: [],
    };
  }

  componentDidMount() {
    axios.get(`${API_URL}`).then((res) => {
      const itemList = res.data;
      this.setState({ itemList });
    });
  }

  render() {
    const { itemList } = this.state;
    return (
      <div className="container mt-4">
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Item Category</th>
              <th scope="col">Amount</th>
              <th scope="col">Description</th>
            </tr>
          </thead>
          <tbody>
            {itemList.data &&
              itemList.data.map((items, index) => (
                <tr key={index}>
                  <td scope="row" key={index}>
                    {items.item_name}
                  </td>
                  <td>{items.item_amount}</td>
                  <td>{items.description}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
}

import React, { Component } from "react";
import "../scss/main.scss";
import axios from "axios";
import ReactTable from "react-table";
import "react-table/react-table.css";

const API_URL = "http://localhost:3000/itemList";

export default class ItemsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemList: [],
      loading: true,
    };
  }

  componentDidMount() {
    axios.get(`${API_URL}`).then((res) => {
      const itemList = res.data;
      itemList.data.map((item, index) => {
        if (item.date) {
          let newDate = new Date(item.date);
          let final = `${newDate.getDate()} / ${
            newDate.getMonth() + 1
          } / ${newDate.getFullYear()}`;
          item.date = final;
          return item;
        } else {
          return item;
        }
      });
      this.setState({ itemList, loading: false });
    });
  }

  render() {
    const { itemList } = this.state;
    const columns = [
      {
        Header: "Category",
        accessor: "item_name",
      },

      {
        Header: "Amount",
        accessor: "item_amount",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Date",
        accessor: "date",
      },
    ];
    return (
      <div className="container mt-4">
        <ReactTable data={itemList.data} columns={columns} />
        {/* <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Item Category</th>
              <th scope="col">Amount</th>
              <th scope="col">Description</th>
              <th scope="col">Date</th>
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
                  <td>{items.date}</td>
                </tr>
              ))}
          </tbody>
        </table> */}
      </div>
    );
  }
}

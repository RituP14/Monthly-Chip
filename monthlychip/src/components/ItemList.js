import React, { Component } from "react";
import "../scss/main.scss";
import axios from "axios";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Input } from "semantic-ui-react";

const API_URL = "http://localhost:3000/itemList";

export default class ItemsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemList: [],
      filteredData: [],
      columns: [],
      //searchInput: "",
    };
  }

  getData() {
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
      this.setState({ itemList });
    });
  }
  componentDidMount() {
    this.getData();
  }
  handleChange = (event) => {
    let searchInput = event.target.value;
    this.globalSearch(searchInput);
  };
  globalSearch = (searchInput) => {
    let { itemList } = this.state;
    //console.log("Heyyy hiiii", this.state.itemList);
    if (searchInput) {
      let filteredData = itemList.data.filter((value) => {
        return value.item_name
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      let itemListNew = {
        data: filteredData,
      };
      this.setState({ itemList: itemListNew });
    } else {
      this.getData();
    }
  };
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
      <form>
        <Input
          className="m-4"
          size="large"
          name="searchInput"
          ref={(input) => (this.search = input)}
          onChange={this.handleChange}
          label="Search"
        />
        <ReactTable
          className="mx-auto w-75 -striped -highlight"
          data={itemList.data}
          columns={columns}
          defaultPageSize={10}
        />
      </form>
    );
  }
}

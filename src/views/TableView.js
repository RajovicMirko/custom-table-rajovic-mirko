import React, { Component } from "react";
import { connect } from "react-redux";
import Table from "../components/Table";

class TableView extends Component {
  state = {
    tableConfig: {
      title: "Users",
      useFilter: true,
      usePagination: {
        currentPage: 1,
        rowsPerPage: 20,
        rowsPerPageArray: [20, 50, 100],
      },
      header: {
        fullName: "Full name",
        balance: "Balance",
        isActive: "Active",
        registered: "Registered",
        state: "State",
        country: "Country",
      },
      body: this.props.users,
    },
  };
  render() {
    return (
      <div className="page">
        <Table tableConfig={this.state.tableConfig} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users.users,
  };
};

export default connect(mapStateToProps)(TableView);

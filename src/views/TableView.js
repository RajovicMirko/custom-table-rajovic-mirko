import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from '../components/Table';

class TableView extends Component {
  state = {
    tableConfig: {
      title: 'Users',
      useFilter: true,
      usePagination: {
        rowsPerPage: 20
      },
      header: ['Full name', 'Balance', 'Active', 'Registered', 'State', 'Country'],
      body: this.props.users
    }
  }
  render() {
    return (
      <div className="page">
        <Table tableConfig={ this.state.tableConfig } />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users.users
  }
}

export default connect(mapStateToProps)(TableView);
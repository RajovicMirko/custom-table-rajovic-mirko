import React, { Component, createRef } from "react";

import "./table.scss";
import Header from "./Header";
import Row from "./Row";

import { sortTableByColumn } from "./helpers/sortTableByColumn";
import { filterTable } from "./helpers/filterTable";
import Pagination from "./Pagination/pagination";

class Table extends Component {
  constructor(props) {
    super(props);
    this.tableRef = createRef();
    this.state = {
      title: props.tableConfig.title,
      useFilter: props.tableConfig.useFilter,
      usePagination: props.tableConfig.usePagination,
      header: props.tableConfig.header,
      body: props.tableConfig.body,

      // filter
      filteredBody: props.tableConfig.body,
      filterInput: "",

      // sorting
      sortConfig: {
        isFiltered: false,
        lastKey: null,
        sortAsc: null, // true for asc, false for desc
      },

      pagination: null,
    };
  }

  componentDidMount() {
    const state = this.state;

    state.pagination = new Pagination({
      ...state.usePagination,
      data: state.body,
      callBack: (data) => this.setState({ filteredBody: data }),
    });

    this.setState({ ...state });

    state.pagination.init();
  }

  handleInputFilter = (e) => {
    const state = this.state;
    state.filterInput = e.target.value;
    state.filteredBody = filterTable(this.state.body, state.filterInput);
    state.pagination.changeData(state.filteredBody);
  };

  handleSort = (key) => {
    const state = this.state;

    sortTableByColumn(
      key,
      state.sortConfig,
      state.filteredBody,
      (sortConfig, filteredBody) => this.setState({ sortConfig, filteredBody })
    );
  };

  render() {
    const {
      title,
      useFilter,
      usePagination,
      header,
      filterInput,
      filteredBody,
      sortConfig,
      pagination,
    } = this.state;
    const colspan = header ? Object.keys(header).length : "1";

    return (
      <div className="table table-striped table-sm table-wrapper">
        {/* CAPTION */}
        <div className="caption" colSpan={colspan}>
          <h3>{title}</h3>

          {useFilter && (
            <input
              className="form-control form-control-sm"
              placeholder="Filter"
              value={filterInput}
              onChange={this.handleInputFilter}
            />
          )}
        </div>

        {/* TABLE ELEMENT */}
        <table className="table-sortable table-pagination" ref={this.tableRef}>
          <thead>
            {header && (
              <Header
                headers={header}
                sortConfig={sortConfig}
                onClick={this.handleSort}
              />
            )}
          </thead>
          <tbody>
            {/* DATA EXISTS */}
            {filteredBody &&
              filteredBody.length &&
              filteredBody.map((row, i) => <Row key={i} data={row} />)}

            {/* NO DATA */}
            {!filteredBody && (
              <tr>
                <td key="no-data" className="no-data" colSpan={colspan}>
                  No data available
                </td>
              </tr>
            )}
          </tbody>

          <tfoot>
            {/* PAGINATION */}
            {
              <tr>
                <td colSpan={colspan}>
                  {usePagination && pagination && pagination.component()}
                </td>
              </tr>
            }
          </tfoot>
        </table>
      </div>
    );
  }
}

export default Table;

import React, { Component } from 'react'

import './table.scss';
import Header from './Header';
import Row from './Row';
import Pagination from './Pagination';

import { sortTableByColumn } from './helpers/sortTableByColumn';
import { filterTable } from './helpers/filterTable';

class Table extends Component {
  constructor(props){
    super(props)
    this.tableRef = React.createRef();
    this.state={
      title: props.tableConfig.title,
      useFilter: props.tableConfig.useFilter,
      usePagination: props.tableConfig.usePagination,
      header: props.tableConfig.header,
      body: props.tableConfig.body,

      // filter
      filteredBody: props.tableConfig.body,
      filterInput: '',

      // sorting
      sortingColumnIndex: null,
      asc: null,

      // pagination
      pagination: {
        currentPage: 1,
        rowsPerPage: (props.tableConfig.usePagination && props.tableConfig.usePagination.rowsPerPage) || 2000,
      }
    }
  }

  componentDidMount(){
    this.setState({ filteredBody: this.props.tableConfig.body.slice(0, this.state.pagination.rowsPerPage)});
  }

  handleInputFilter = (e) => {
    const state = this.state;
    state.filterInput = e.target.value;
    state.filteredBody = filterTable(this.state.body, this.state.filterInput);
    this.setState({ ...state });

    const data = {
      currentPage: 1,
      rowsPerPage: state.pagination.rowsPerPage,
      // filteredBody: state.filteredBody
    }

    this.handlePagination(data);
  }

  handleSort = async (columnIndexClicked) => {
    if(this.state.sortingColumnIndex === columnIndexClicked) await this.setState({ asc: !this.state.asc});
    this.setState({sortingColumnIndex: columnIndexClicked});

    sortTableByColumn(this.tableRef.current, columnIndexClicked, this.state.asc)
  }

  handlePagination = (data) => {
    const { currentPage, rowsPerPage, filteredBody=null } = data;
    const state = this.state;
    state.pagination.currentPage = currentPage;
    state.pagination.rowsPerPage = rowsPerPage;
    if(filteredBody) state.filteredBody = filteredBody;
    this.setState({ ...state });
  }

  render() {
    const { title, useFilter = true, usePagination = true, header, body, filteredBody, filterInput, pagination } = this.state;
    const colspan = header.length ? header.length : "1";
    
    return (
      <div className="table table-striped table-sm table-wrapper">
        {/* CAPTION */}
        <div className="caption" colSpan={ colspan }>
          <h3>{ title }</h3>

          { 
            useFilter &&
            <input
              className="form-control form-control-sm"
              placeholder="Filter"
              value={ this.filterInput }
              onChange={ this.handleInputFilter }
            />
          }
        </div>

        {/* TABLE ELEMENT */}
        <table className="table-sortable" ref={ this.tableRef }>
          <thead>
            { 
              header &&
              <Header data={ header } onClick={ this.handleSort } />
            }
          </thead>
          <tbody>
            {/* DATA EXISTS */}
            { 
              filteredBody && !!filteredBody.length
              && filteredBody.map(
                (row, i) => <Row key={i} data={ row } />
              )
            }

            {/* NO DATA */}
            {
              filteredBody && !filteredBody.length &&
              <tr>
                <td className="no-data" colSpan={ colspan }>No data available</td>
              </tr>
            }
          </tbody>

          <tfoot>
            {/* PAGINATION */}
            {
              usePagination && filteredBody && !!filteredBody.length &&
              <tr>
                <td colSpan={ colspan }>
                  <Pagination
                    {...pagination}
                    onPagination={ this.handlePagination }
                    data={ filterInput ? filteredBody : body}
                  />
                </td>
              </tr>
            }
          </tfoot>
        </table>
      </div>
    )
  }
}

export default Table;

import React from 'react'

function Select(props) {
  const { rowsPerPage, onSelect } = props;
  
  return (
    <React.Fragment>
      <div>
        <label
          htmlFor="rowsPerPage"
        >
          <small>Per page</small>
        </label>
        <select
          id="rowsPerPage"
          className="custom-select custom-select-sm ml-2"
          defaultValue={ rowsPerPage }
          onChange={onSelect}
        >
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
    </React.Fragment>
  )
}

export default Select

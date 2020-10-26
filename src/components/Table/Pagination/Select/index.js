import React from 'react'

function Select(props) {
  const { rowsPerPage, options, onSelect } = props;
  
  return (
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
        onChange={ onSelect }
      >
        { options && options.map(option => <option key={ option } value={ option }>{ option }</option>)}
      </select>
    </div>
  )
}

export default Select

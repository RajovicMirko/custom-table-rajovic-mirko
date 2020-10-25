import React from 'react';
import CheckBox from '../../Checkbox';

function Cell({ value }) {
  const field = typeof value === "boolean"
    ? <td><CheckBox value={ value } disabled={ true } /></td>
    : <td className="text">{value}</td>;
    
  return field;
};

export default Cell;

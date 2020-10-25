import React from 'react'

function CheckBox({ value, disabled }) {
  return (
    <div className="form-check form-check-xl check-box">
      <input className="form-check-input" type="checkbox" disabled={disabled} checked={value} />
    </div>
  )
};

export default CheckBox;

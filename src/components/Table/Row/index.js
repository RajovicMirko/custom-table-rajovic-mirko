import React from 'react'
import Cell from '../Cell'

function Row({ data }) {
  return (
    <tr>
      { Object.keys(data).map((key, i) => <Cell key={i} value={ data[key] } />) }
    </tr>
  )
}

export default Row

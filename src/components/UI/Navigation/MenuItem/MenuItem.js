import React from 'react'

const MenuItem = (props) => (
  <div onClick={props.open}>
      {props.children}
  </div>
)

export default MenuItem
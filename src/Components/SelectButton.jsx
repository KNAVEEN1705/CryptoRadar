import React from 'react'
import "../App.css"
const SelectButton = ({children, selected, onClick} ) => {
  return (
   <span onClick={onClick}
    className={`select-button ${selected ? 'selected' : ''}`}>
    {children}
   </span>
  )
}

export default SelectButton
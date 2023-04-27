import React from 'react'

const SearchInput = ({ placeholder, value, onChange, name }) => {
  return (
    <div className="col-md-3">
    <input
      type="text"
      className="form-control rounded-pill"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
    />
  </div>
  )
}

export default SearchInput
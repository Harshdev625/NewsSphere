import React from 'react'
import loading from "./Spinner-1s-200px.gif"
const Spinner = () => {
  return (
    <div className="text-center">
      <img className="my-3" src={loading} alt="loading.gif" />
    </div>
  )
}

export default Spinner
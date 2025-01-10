import React, { useState } from 'react'

const IncrementalButton = ({ count, onIncrement, onDecrement }) => {
  return (
    <div className="flex items-center bg-white  w-fit rounded-lg sm:m-8 border-[1px] border-gray-300">
      <button
        onClick={onDecrement}
        className="px-2 py-1 rounded-l-lg bg-white text-sm"
      >
        -
      </button>
      <span className="mx-2 text-xs ">{count}</span>
      <button
        onClick={onIncrement}
        className="px-2 py-1s rounded-r-lg bg-white text-sm"
      >
        +
      </button>
    </div>
  )
}

export default IncrementalButton

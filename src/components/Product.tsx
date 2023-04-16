import React from 'react'

const Product = ({
  name,
  calories,
  onClick,
}: {
  name: string
  calories: number
  onClick: () => void
}) => {
  return (
    <div
      onClick={onClick}
      className="rounded-lg border border-black px-5 py-1 transition-colors hover:border-gray-400 transition-all cursor-pointer"
    >
      <h2 className={`text-base mb-1 font-semibold`}>
        {name} - {calories} ccal
      </h2>
    </div>
  )
}

export default Product

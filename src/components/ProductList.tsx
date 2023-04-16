import React from 'react'
import { IProductItemList } from '@/types/types'

const ProductList = ({
  productList,
  onDeleteProduct,
}: {
  productList: IProductItemList[]
  onDeleteProduct: (name: string) => void
}) => {
  return (
    <div>
      {productList.length ? (
        <div>
          <div className="mb-2">Products list</div>
          <div className="flex flex-col gap-2 mb-4 ">
            {productList.map((product) => (
              <div
                key={product.name}
                className="grid grid-cols-3 gap-2 bg-[#8B99D4] rounded-xl py-2 px-3"
              >
                <div className="justify-self-start">{product.name}</div>
                <div className="justify-self-center">{product.grams} grams</div>
                <button
                  className="justify-self-end"
                  onClick={() => onDeleteProduct(product.name)}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex items-center">No products</div>
      )}
    </div>
  )
}

export default ProductList

import ProductAddForm from '@/components/ProductAddForm'
import { useState } from 'react'
import ProductList from '@/components/ProductList'
import { IProductItemList } from '@/types/types'

export default function Home() {
  const [productList, setProductList] = useState<IProductItemList[]>([])

  const onDeleteProduct = (name: string) => {
    setProductList((prevState) => prevState.filter((el) => el.name !== name))
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="bg-[#F2BDBB] p-4 rounded-3xl min-h-[1000px]">
        <ProductAddForm setProductList={setProductList} />
        <ProductList
          productList={productList}
          onDeleteProduct={onDeleteProduct}
        />
        {productList.length ? (
          <button className="px-3 py-2 rounded-xl bg-[#8B99D4]">
            Calculate
          </button>
        ) : null}
      </div>
    </main>
  )
}

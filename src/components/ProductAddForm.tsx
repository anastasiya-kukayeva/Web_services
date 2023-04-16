import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { products } from '@/constants/products'
import Product from '@/components/Product'
import { IProduct, IProductItemList } from '@/types/types'

const ProductAddForm = ({
  setProductList,
}: {
  setProductList: (
    value: IProductItemList[]
  ) => void | ((prevState: IProductItemList[]) => IProductItemList[])
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchName, setSearchName] = useState('')
  const [selectProduct, setSelectProduct] = useState<IProduct | null>(null)
  const [productGrams, setProductGrams] = useState(0)

  const onAddProduct = () => {
    if (selectProduct && productGrams) {
      setProductList((prevState: IProductItemList[]) => [
        ...prevState,
        { ...selectProduct, grams: productGrams },
      ])
      setSelectProduct(null)
      setIsOpen(false)
      setSearchName('')
      setProductGrams(0)
    }
  }

  const handleChangeInputProductName = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.currentTarget.value)
  }
  const handleChangeInputProductGrams = (e: ChangeEvent<HTMLInputElement>) => {
    if (+e.currentTarget.value >= 0 && +e.currentTarget.value < 5000) {
      setProductGrams(+e.currentTarget.value)
    }
  }

  const contentRef = useRef<HTMLDivElement | null>(null)
  const buttonRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    const onClick = (e: any) => {
      if (buttonRef?.current?.contains(e.target)) {
        setIsOpen((prevState) => {
          return prevState
        })
      } else if (!contentRef?.current?.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [isOpen, setIsOpen])

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchName)
  )

  return (
    <div className="flex mb-4">
      <div>
        <input
          ref={buttonRef}
          type={'text'}
          placeholder={'Select product'}
          value={searchName}
          onFocus={() => setIsOpen(true)}
          onChange={handleChangeInputProductName}
          className="px-3 py-2 border border-solid border-black rounded-xl mr-2 bg-[#FFCD93] w-[200px] outline-0 placeholder:text-black"
        />

        <div>
          <div className={'relative'}>
            <div className={'absolute z-30 left-0 top-2 '}>
              {/*<Accordion open={isOpen}>*/}
              {isOpen ? (
                <div
                  ref={contentRef}
                  className="bg-[#FFCD93] w-[200px] max-h-[500px] overflow-y-auto scrollbar-tune flex flex-col gap-y-3 rounded-xl border border-solid border-black px-4 py-3"
                >
                  {filteredProducts.length ? (
                    filteredProducts.map((product) => (
                      <Product
                        key={product.name}
                        name={product.name}
                        calories={product.calories}
                        onClick={() => {
                          setSelectProduct(product)
                          setSearchName(product.name)
                        }}
                      />
                    ))
                  ) : (
                    <div>Product not found</div>
                  )}
                </div>
              ) : null}
              {/*</Accordion>*/}
            </div>
          </div>
        </div>
      </div>

      <input
        type={'text'}
        placeholder={'Enter gramm'}
        value={productGrams === 0 ? '' : productGrams}
        onChange={handleChangeInputProductGrams}
        className="px-3 py-2 border border-solid border-black rounded-xl mr-2 w-[120px] bg-[#FFCD93] outline-0 placeholder:text-black"
      />
      <buttons
        onClick={onAddProduct}
        className="px-3 py-2 rounded-xl bg-[#8B99D4] cursor-pointer"
      >
        Add
      </buttons>
    </div>
  )
}

export default ProductAddForm

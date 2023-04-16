export interface IProduct {
  name: string
  calories: number
}

export interface IProductItemList extends IProduct {
  grams: number
}

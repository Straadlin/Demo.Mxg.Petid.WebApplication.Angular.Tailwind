export interface GetProductsDto {
  data: Data
  isSuccess: boolean
  message: string
  httpStatusCode: number
}

export interface Data {
  count: number
  pageIndex: number
  pageSize: number
  records: Record[]
  pageCount: number
}

export interface Record {
  id: string
  code: string
  name: string
  description: string
  salePrice: number
  purchasePrice: number
  createdDate: string
  lastModifiedDate: string | null
}

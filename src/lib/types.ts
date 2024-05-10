export type TableData = {
  mainCategory: string
  subCategories: Array<{
    category: string
    expenses: Array<{
      name: string
      value: number
      comitente: number
    }>
  }>
}

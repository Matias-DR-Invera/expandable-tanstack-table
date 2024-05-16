import { faker } from '@faker-js/faker'

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

export const originalData: TableData[] = [
  {
    mainCategory: 'Acciones',
    subCategories: [
      {
        category: 'MTBAR',
        expenses: [
          { name: 'Bar', value: 100, comitente: 1000 },
          { name: 'Baz', value: 200, comitente: 1000 }
        ]
      },
      {
        category: 'MTBAR2',
        expenses: [
          { name: 'Car', value: 100, comitente: 1000 },
          { name: 'Bike', value: 200, comitente: 1000 }
        ]
      }
    ]
  },
  {
    mainCategory: 'Opciones',
    subCategories: [
      {
        category: 'Acciones',
        expenses: [
          { name: 'Bar', value: 100, comitente: 1000 },
          { name: 'Baz', value: 200, comitente: 1000 }
        ]
      },
      {
        category: 'Transport',
        expenses: [
          { name: 'Car', value: 100, comitente: 1000 },
          { name: 'Bike', value: 200, comitente: 1000 }
        ]
      }
    ]
  }
]

export interface Transactions {
  number: string
  concertation: string
  operation: 'venta' | 'compra'
}

export interface SubAsset {
  category: string
  transactions: Transactions[]
}

export interface Asset {
  category: string
  subCategories: SubAsset[]
}

export const assetsData = {
  category: faker.finance.transactionType(),
  subCategories: Array.from({ length: Math.floor(Math.random() * 10) }, () => [
    {
      category: faker.finance.transactionType(),
      transactions: Array.from(
        { length: Math.floor(Math.random() * 10) },
        () => [
          {
            number: faker.finance.accountNumber(5),
            concertation: faker.date.recent().toLocaleDateString(),
            operation: Math.random() > 0.5 ? 'compra' : 'venta'
          }
        ]
      )
    }
  ])
}

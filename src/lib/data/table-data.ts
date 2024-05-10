import { TableData } from '@/lib'

const tableData: TableData[] = [
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

export default tableData

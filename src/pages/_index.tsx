import { Combobox } from '@/components/ui/combobox'
import { Table } from '@/components/ui-custom'
import { TableData } from '@/lib'
import { tableData } from '@/lib/data'
import { useMemo, useState } from 'react'

import {
  ColumnDef,
  createColumnHelper,
  ExpandedState,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable
} from '@tanstack/react-table'

interface Data {
  category: string
  subCategory: string
  expense: {
    name: string
    value: number
    comitente: number
  }
}

const adaptedData: Data[] = []

tableData.forEach((data: TableData) => {
  data.subCategories.forEach(subCategory => {
    subCategory.expenses.forEach(expense => {
      adaptedData.push({
        category: data.mainCategory,
        subCategory: subCategory.category,
        expense
      })
    })
  })
})

const columnHelper = createColumnHelper<Data>()

const columns = [
  columnHelper.group({
    id: 'category',
    header: ({ table }) => (
      <button
        className='w-full text-left appearance-none border-b border-primary'
        onClick={table.getToggleAllRowsExpandedHandler}
      >
        {
          columnHelper
            .accessor(row => row.category, {
              id: 'category',
              cell: info => info.getValue()
            })
            .cell?.valueOf() as string
        }
      {table.getIsAllRowsExpanded() ? '↑' : '↓'}
      </button>
    ),
    columns: [
      columnHelper.group({
        id: 'subCategory',
        header: columnHelper
          .accessor(row => row.subCategory, {
            id: 'category',
            cell: info => { console.log(info); return 'info.getValue()' }
          })
          .cell?.valueOf() as string,
        columns: [] 
      })
    ]
  })
]

export default function Home () {
  const [expanded, setExpanded] = useState<ExpandedState>({})

  // const columns = useMemo(
  //   () => [
  //     columnHelper.accessor('mainCategory', {
  //       header: 'Category',
  //       id: 'category',
  //       cell: info => {
  //         return (
  //           <>
  //             {info.row.getCanExpand() && (
  //               <button onClick={info.row.getToggleExpandedHandler()}>
  //                 {info.row.getIsExpanded() ? '-' : '+'}
  //               </button>
  //             )}
  //             {info.getValue()}
  //           </>
  //         )
  //       }
  //     }),
  //     columnHelper.accessor('subCategories.', {
  //       header: 'Expense',
  //       id: 'expense-value'
  //     })
  //   ],
  //   []
  // )

  const table = useReactTable({
    data: adaptedData,
    columns,
    state: {
      expanded
    },
    getExpandedRowModel: getExpandedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    onExpandedChange: setExpanded
    // getSubRows: originalRow => {
    //   console.log(originalRow)
    //   // console.log(
    //   //   'sub categories',
    //   //   originalRow.subCategories.map(subcategory => subcategory),
    //   //   Boolean(originalRow.subCategories)
    //   // )

    //   // if (originalRow.subCategories) {
    //   //   const rows = originalRow.subCategories.map(subCategory => {
    //   //     const subRows = subCategory.expenses.map(expense => {
    //   //       const subRow = {
    //   //         category: subCategory.category,
    //   //         expense: expense.name,
    //   //         total: expense.value
    //   //       }

    //   //       return subRow
    //   //     })

    //   //     return subRows
    //   //   })
    //   //   return rows
    //   // }

    //   return originalRow.
    //   // console.log('Rows', rows)
    //   // console.log('Rows flattened', rows.flat(2))
    // }
  })

  return (
    <main className='size-screen'>
      <Combobox />
      <Table table={table} />
    </main>
  )
}

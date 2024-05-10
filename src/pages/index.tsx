import { Combobox } from '@/components/ui/combobox'
import { Table } from '@/components/ui-custom'
import { TableData } from '@/lib'
import { tableData } from '@/lib/data'
import { useMemo, useState } from 'react'

import {
  createColumnHelper,
  ExpandedState,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable
} from '@tanstack/react-table'

const columnHelper = createColumnHelper<TableData>()

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

  const columns = [
    {
      Header: 'Category',
      accessor: 'category'
    },
    {
      Header: 'Expense',
      accessor: 'expense'
    },
    {
      Header: 'Total',
      accessor: 'total'
    },
    {
      Header: 'Expenses',
      id: 'expenses',
      accessor: expenses =>
        expenses.map(item => (
          <div>
            <span style={{ marginRight: '10px' }}>{item.name} {item.value} {item.comitente}</span>
            <span>{item.value}</span>
          </div>
        ))
    }
  ]

  const table = useReactTable({
    data: tableData,
    columns,
    state: {
      expanded
    },
    getExpandedRowModel: getExpandedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    onExpandedChange: setExpanded,
    getSubRows: originalRow => {
      console.log(originalRow)
      // console.log(
      //   'sub categories',
      //   originalRow.subCategories.map(subcategory => subcategory),
      //   Boolean(originalRow.subCategories)
      // )

      if (originalRow.subCategories) {
        const rows = originalRow.subCategories.map(subCategory => {
          const subRows = subCategory.expenses.map(expense => {
            const subRow = {
              category: subCategory.category,
              expense: expense.name,
              total: expense.value
            }

            return subRow
          })

          return subRows
        })
        return rows
      }

      return originalRow
      // console.log('Rows', rows)
      // console.log('Rows flattened', rows.flat(2))
    }
  })

  return (
    <main className='size-screen'>
      <Combobox />
      <Table table={table} />
    </main>
  )
}

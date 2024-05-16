import {
  GroupingState,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
  getCoreRowModel,
  getGroupedRowModel,
  getExpandedRowModel,
  ColumnDef,
  flexRender
} from '@tanstack/react-table'
import { faker } from '@faker-js/faker'
import { useMemo, useReducer, useState } from 'react'

// CUSTOM

export type Transactions = {
  number: string
  concertation: string
  operation: 'venta' | 'compra'
}

export type SubAsset = {
  subAsset: string
  transactions: Transactions[]
}

export type Asset = {
  asset: string
  subCategories: SubAsset[]
}

export const assetsData = {
  asset: faker.finance.transactionType(),
  subCategories: Array.from({ length: Math.floor(Math.random() * 10) }, () => [
    {
      subAsset: faker.finance.transactionType(),
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

// Number, Arrangement, Settlement, Transaction type, Quantity, Price, Gross, Tariff, Market, Registration/Liquid, Net, Download
// Número, Concertación, Liquidación, Tipo de operación, Cantidad, Precio, Bruto, Arancel, Mercado, Registro/Liq., Neto, Descarga
interface UnifiedAsset
  extends Record<string, string | number | UnifiedAsset[] | null | undefined> {
  number: number
  arrangement: string
  settlement: string
  'transaction-type': string
  quantity: number
  price: number
  gross: number
  tariff: number
  market: number
  'registration-liquid': number
  net: number
  download: string
  asset: string
  subAsset: string
  subRows?: UnifiedAsset[]
}

const newAsset = (): UnifiedAsset => {
  return {
    number: faker.number.float({ min: 10000, max: 99999 }),
    arrangement: faker.date.past().toLocaleDateString(),
    settlement: faker.date.past().toLocaleDateString(),
    'transaction-type': Math.random() > 0.5 ? 'Compra' : 'Venta',
    quantity: faker.number.float({ min: 1, max: 99999 }),
    price: faker.number.float({ min: 1, max: 999999999 }),
    gross: faker.number.float({ min: 1, max: 999999999 }),
    tariff: faker.number.float({ min: 1, max: 9999999 }),
    market: faker.number.float({ min: 1, max: 9999 }),
    'registration-liquid': faker.number.float({ min: 0, max: 999999999 }),
    net: faker.number.float({ min: 1, max: 999999999 }),
    download: 'https://google.com',
    asset:
      Math.random() < 0.3
        ? 'Asset 1'
        : Math.random() < 0.7
        ? 'Asset 2'
        : 'Asset 3',
    subAsset:
      Math.random() < 0.3
        ? 'Sub Asset 1'
        : Math.random() < 0.7
        ? 'Sub Asset 2'
        : 'Sub Asset 3'
  }
}

const makeUnifiedAssets = (...lens: number[]): UnifiedAsset[] => {
  const makeUnifiedAssetsLevel = (depth = 0): UnifiedAsset[] => {
    const len = lens[depth]
    return range(len).map((): UnifiedAsset => {
      return {
        ...newAsset(),
        subRows: lens[depth + 1] ? makeUnifiedAssetsLevel(depth + 1) : undefined
      }
    })
  }
  return makeUnifiedAssetsLevel()
}

const columns2: ColumnDef<UnifiedAsset>[] = [
  {
    header: '',
    id: 'asset',
    accessorKey: 'asset',
    aggregatedCell: ({ getValue }) => getValue()
  },
  {
    header: '',
    id: 'subAsset',
    accessorKey: 'subAsset',
    aggregatedCell: ({ getValue }) => getValue()
  },
  {
    header: 'Número',
    id: 'number',
    accessorKey: 'number',
    cell: info => info.getValue()
  },
  {
    header: 'Concertación',
    id: 'arrangement',
    accessorKey: 'arrangeme',
    cell: info => info.getValue()
  },
  {
    header: 'Liquidación',
    id: 'settlement',
    accessorKey: 'settlemen',
    cell: info => info.getValue()
  },
  {
    header: 'Tipo de transacción',
    id: 'transaction-type',
    accessorKey: 'transacti',
    cell: info => info.getValue()
  },
  {
    header: 'Cantidad',
    id: 'quantity',
    accessorKey: 'quantity',
    cell: info => info.getValue()
  },
  {
    header: 'Precio',
    id: 'price',
    accessorKey: 'price',
    cell: cell => cell.getValue()
  },
  {
    header: 'Bruto',
    id: 'gross',
    accessorKey: 'gross',
    cell: cell => cell.getValue()
  },
  {
    header: 'Arancel',
    id: 'tariff',
    accessorKey: 'tariff',
    cell: cell => cell.getValue()
  },
  {
    header: 'Mercado',
    id: 'market',
    accessorKey: 'market',
    cell: cell => cell.getValue()
  },
  {
    header: 'Registro/Liq.',
    id: 'registration-liquid',
    accessorKey: 'registrat',
    cell: cell => cell.getValue()
  },
  {
    header: 'Neto',
    id: 'net',
    accessorKey: 'net',
    cell: cell => cell.getValue()
  },
  {
    header: 'Download',
    id: 'download',
    accessorKey: 'download',
    cell: cell => cell.getValue()
  }
]

// CUSTOM

export type Person = {
  firstName: string 
  lastName: string
  age: number
  visits: number
  progress: number
  status: 'relationship' | 'complicated' | 'single'
  subRows?: Person[]
}

const range = (len: number) => {
  const arr: number[] = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

const newPerson = (): Person => {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    age: faker.number.int(40),
    visits: faker.number.int(1000),
    progress: faker.number.int(100),
    status: faker.helpers.shuffle<Person['status']>([
      'relationship',
      'complicated',
      'single'
    ])[0]!
  }
}

export function makeData (...lens: number[]) {
  const makeDataLevel = (depth = 0): Person[] => {
    const len = lens[depth]!
    return range(len).map((d): Person => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined
      }
    })
  }

  return makeDataLevel()
}

const Table = () => {
  const rerender = useReducer(() => ({}), {})[1]

  const columns = useMemo<ColumnDef<Person>[]>(
    () => [
      {
        header: 'Name',
        columns: [
          {
            accessorKey: 'firstName',
            header: 'First Name',
            cell: info => info.getValue(),
            /**
             * override the value used for row grouping
             * (otherwise, defaults to the value derived from accessorKey / accessorFn)
             */
            getGroupingValue: row => `${row.firstName} ${row.lastName}`
          },
          {
            accessorFn: row => row.lastName,
            id: 'lastName',
            header: () => <span>Last Name</span>,
            cell: info => info.getValue()
          }
        ]
      },
      {
        header: 'Info',
        columns: [
          {
            accessorKey: 'age',
            header: () => 'Age',
            aggregatedCell: ({ getValue }) =>
              Math.round(getValue<number>() * 100) / 100,
            aggregationFn: 'median'
          },
          {
            header: 'More Info',
            columns: [
              {
                accessorKey: 'visits',
                header: () => <span>Visits</span>,
                aggregationFn: 'sum'
                // aggregatedCell: ({ getValue }) => getValue().toLocaleString(),
              },
              {
                accessorKey: 'status',
                header: 'Status'
              },
              {
                accessorKey: 'progress',
                header: 'Profile Progress',
                cell: ({ getValue }) =>
                  Math.round(getValue<number>() * 100) / 100 + '%',
                aggregationFn: 'mean',
                aggregatedCell: ({ getValue }) =>
                  Math.round(getValue<number>() * 100) / 100 + '%'
              }
            ]
          }
        ]
      }
    ],
    []
  )

  // const [data, setData] = useState(() => makeData(10, 7, 5))
  // const refreshData = () => setData(() => makeData(10, 7, 5))

  const [data, setData] = useState(() => makeUnifiedAssets(10, 7, 5))
  const refreshData = () => setData(() => makeUnifiedAssets(10, 7, 5))

  const [grouping, setGrouping] = useState<GroupingState>([])

  const table = useReactTable({
    data,
    columns: columns2,
    state: {
      grouping
    },
    onGroupingChange: setGrouping,
    getExpandedRowModel: getExpandedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    debugTable: true
  })

  return (
    <div className='p-2'>
      <div className='h-2' />
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div>
                        {header.column.getCanGroup() ? (
                          // If the header can be grouped, let's add a toggle
                          <button
                            {...{
                              onClick: header.column.getToggleGroupingHandler(),
                              style: {
                                cursor: 'pointer'
                              }
                            }}
                          >
                            {header.column.getIsGrouped()
                              ? `🛑(${header.column.getGroupedIndex()}) `
                              : `👊 `}
                          </button>
                        ) : null}{' '}
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
                    )}
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => {
                  return (
                    <td key={cell.id}>
                      {cell.getIsGrouped() ? (
                        // If it's a grouped cell, add an expander and row count
                        <>
                          <button onClick={row.getToggleExpandedHandler()}>
                            {row.getIsExpanded() ? '👇' : '👉'}{' '}
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}{' '}
                            ({row.subRows.length})
                          </button>
                        </>
                      ) : cell.getIsAggregated() ? (
                        // If the cell is aggregated, use the Aggregated
                        // renderer for cell
                        flexRender(
                          cell.column.columnDef.aggregatedCell ??
                            cell.column.columnDef.cell,
                          cell.getContext()
                        )
                      ) : cell.getIsPlaceholder() ? null : ( // For cells with repeated values, render null
                        // Otherwise, just render the regular cell
                        flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )
                      )}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className='h-2' />
      <div className='flex items-center gap-2'>
        <button
          className='border rounded p-1'
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {'<<'}
        </button>
        <button
          className='border rounded p-1'
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </button>
        <button
          className='border rounded p-1'
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </button>
        <button
          className='border rounded p-1'
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {'>>'}
        </button>
        <span className='flex items-center gap-1'>
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </strong>
        </span>
        <span className='flex items-center gap-1'>
          | Go to page:
          <input
            type='number'
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              table.setPageIndex(page)
            }}
            className='border p-1 rounded w-16'
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={e => {
            table.setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      <div>{table.getRowModel().rows.length} Rows</div>
      <div>
        <button onClick={() => rerender()}>Force Rerender</button>
      </div>
      <div>
        <button onClick={() => refreshData()}>Refresh Data</button>
      </div>
      <pre>{JSON.stringify(grouping, null, 2)}</pre>
    </div>
  )
}

export default Table

import { type TableData } from '@/lib'
import { Table as TTT, flexRender } from '@tanstack/react-table'

/**
 * Copied from react-table "Basic" example (with footer removed)
 * https://tanstack.com/table/v8/docs/examples/react/basic
 */
export default function Table ({ table }: { table: TTT<TableData> }) {
  return (
    <div className='p-2'>
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

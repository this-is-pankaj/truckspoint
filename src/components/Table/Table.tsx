type TableProps = {
  columns: string[];
}

const Table = ({ columns }: TableProps) => {
  return (
    <div className="overflow-auto w-full">
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column}
                scope="col"
                className="border border-gray-300 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {/* Table rows go here */}
        </tbody>
      </table>
    </div>
  )
}

export default Table;
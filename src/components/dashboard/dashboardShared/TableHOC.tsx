import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { useState } from "react";

type TableProps<T> = {
  columns: ColumnDef<T>[];
  data: T[];
  containerClassName: string;
  heading: string;
  tableClass?: string;
  pagination?: boolean;
};

// Define the TableHOC function
const TableHOC = <T extends object>({ columns, data, containerClassName, heading,
  tableClass = "table", pagination = false, }: TableProps<T>) => {


  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    initialState: {
      pagination: {
        pageSize: 4,
        pageIndex: 0
      },
    },
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className={containerClassName}>
      <h2 className="heading">{heading}</h2>
      <table className={tableClass}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                // className="px-4 pr-2 py-4 font-medium text-left"
                >
                  {header.isPlaceholder ? null : (
                    <div
                      {...{
                        style: {
                          cursor: header.column.getCanSort()
                            ? "pointer"
                            : "auto",
                        },
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: <span style={{ paddingLeft: "2px" }}>↑</span>,
                        desc: <span style={{ paddingLeft: "2px" }}>↓</span>,
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {pagination && (
        <div className="pagination" style={{ width: "100%", marginTop: "20px", fontSize: "12px" }}>
          <div style={{ display: "flex", justifyContent: "center", alignmentBaseline: "central", gap: "12px" }}>
            <button className="paginationBtn"
              style={{
                backgroundColor: table.getCanPreviousPage()
                  ? "rgb(0, 104, 136)"
                  : "#f0f0f0",
                cursor: table.getCanPreviousPage() ? "pointer" : "default",

              }}
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              pre
            </button>
            <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              {/* <input
                min={1}
                max={table.getPageCount()}
                type="number"
                value={table.getState().pagination.pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  table.setPageIndex(page);
                }}
                style={{
                  border: "1px solid #ccc",
                  padding: "3px",
                  borderRadius: "3px",
                  width: "30px",
                }}
              /> */}
              {`${table.getState().pagination.pageIndex + 1} of page ${table.getPageCount()}`}

            </span>
            <button className="paginationBtn"
              style={{
                backgroundColor: table.getCanNextPage() ? "rgb(0, 104, 136)" : "#f0f0f0",
                cursor: table.getCanNextPage() ? "pointer" : "default",
              }}
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableHOC;

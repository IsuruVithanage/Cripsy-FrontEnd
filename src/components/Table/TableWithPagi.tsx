"use client";
import * as React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import Pagination from "@/components/Table/Pagination";

type Column<T> = {
  header: string;
  accessor: keyof T;
  render?: (
    value: T[keyof T],
    row: T,
    handlers?: Record<string, (row: T) => void>
  ) => React.ReactNode;
};

interface TableWithPagiProps<T> extends React.HTMLAttributes<HTMLTableElement> {
  columns: Column<T>[];
  data: T[];
  caption?: string;
  itemsPerPage?: number;
  pagination?: boolean;
  handleEdit?: (row: T) => void;
  handleDelete?: (row: T) => void;
  getRowId: (row: T) => string | number;
}

function TableWithPagi<T>({
  columns,
  data,
  caption,
  itemsPerPage = 10,
  pagination = true,
  className,
  handleEdit,
  handleDelete,
  getRowId,
  ...props
}: TableWithPagiProps<T>) {
  const [currentPage, setCurrentPage] = React.useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Only paginate data, without sorting
  const paginatedData = React.useMemo(() => {
    if (!pagination) return data;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  }, [data, currentPage, itemsPerPage, pagination]);

  return (
    <div className="w-full">
      <div className="overflow-hidden border border-carnation-450 rounded-lg">
        <Table className={cn("your-default-table-styles", className)} {...props}>
          {caption && <TableCaption>{caption}</TableCaption>}
          <TableHeader className="text-nowrap bg-carnation-350 cursor-default">
            <TableRow>
              {columns.map((column) => (
                <TableHead
                  key={String(column.accessor)}
                  role="columnheader"
                  className="text-black font-medium"
                >
                  <span className="flex items-center">{column.header}</span>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody className="border-carnation-450 font-normal text-gray-600">
            {paginatedData.length > 0 ? (
              paginatedData.map((row) => {
                const rowKey = getRowId(row);
                return (
                  <TableRow  key={rowKey} className="border-carnation-450">
                    {columns.map((column) => (
                      <TableCell key={`${rowKey}-${String(column.accessor)}`}>
                        {column.render
                          ? column.render(row[column.accessor], row, {
                            edit: handleEdit ?? (() => { }),
                            delete: handleDelete ?? (() => { }),
                          })
                          : String(row[column.accessor])}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="p-4 text-center text-black">
                  No Records Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {pagination && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}

export default TableWithPagi;

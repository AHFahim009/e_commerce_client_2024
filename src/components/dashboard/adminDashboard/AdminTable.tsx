// define column for table

import { ColumnDef } from "@tanstack/react-table";
import TableHOC from "../dashboardShared/TableHOC";
type TRowData = {
  _id: string;
  quantity: number;
  discount: number;
  amount: number;
  status: string;
};

const columns: ColumnDef<TRowData>[] = [
  {
    header: "ID",
    accessorKey: "_id",
  },
  {
    header: "Amount",
    accessorKey: "amount",
  },
  {
    header: "Quantity",
    accessorKey: "quantity",
  },
  {
    header: "Status",
    accessorKey: "status",
  },
];

type TDashboardTable = {
  data: TRowData[];
};

const DashboardTable = ({ data = [] }: TDashboardTable) => {
  return (
    <TableHOC<TRowData>
      columns={columns}
      data={data} // Provide your data here
      containerClassName="transactionTable"
      heading="Top Transaction"
    />
  );
};
export default DashboardTable;

import { ColumnDef } from "@tanstack/react-table";
import TableHOC from "../../components/dashboard/dashboardShared/TableHOC";
import { useAllOrderQuery } from "../../redux/api/endpoints/order.api";
import { toast } from "sonner";
import { TOrderResponse } from "../../types/responseType";
import EmptyMessage from "../../components/helperComponents/EmptyMessage";
import SkeltonLoading from "../../shared/SkeltonLoading";
import { Link } from "react-router-dom";

const Transaction = () => {
  const {
    data: orders,
    isLoading: isOrdersLoading,
    isError,
  } = useAllOrderQuery("");
  if (isError) toast.warning("Failed to load. Check your internet connection");

  const columns: ColumnDef<TOrderResponse>[] = [
    {
      header: "Name",
      accessorKey: "userId.name",
    },
    {
      header: "Amount",
      accessorKey: "total",
    },
    {
      header: "Discount",
      accessorKey: "discount",
    },
    {
      header: "Quantity",
      cell: (info) => {
        return info.row.original.ordersItem.reduce(
          (total, item) => total + item.quantity,
          0
        );
      },
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (info) => {
        const status = info.row.original.status;
        return (
          <span
            className={
              status === "Processing"
                ? "red"
                : status === "Delivered"
                  ? "purple"
                  : "green"
            }
          >
            {status}
          </span>
        );
      },
    },
    {
      header: "Action",
      accessorKey: "action",
      cell: (info) => {
        return <Link to={`/admin/transaction-management/${info.row.original._id}`}>Manage</Link>
      },
    },
  ];

  const ordersData = orders?.data || [];
  return (
    <div className="transactionPage">
      {
        isOrdersLoading ? <SkeltonLoading length={14}></SkeltonLoading> :
          <>
            {isError || ordersData.length <= 0 ? (
              <EmptyMessage message="No transaction available" />
            ) : (
              <TableHOC
                columns={columns}
                data={ordersData}
                heading="Transaction"
                containerClassName="transactionTable"
                pagination={true}
              />
            )}

          </>
      }
    </div>
  );
};
export default Transaction;

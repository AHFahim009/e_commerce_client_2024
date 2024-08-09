import TableHOC from "../../components/dashboard/dashboardShared/TableHOC"
import { ColumnDef } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import { useMyOrderQuery } from "../../redux/api/endpoints/order.api";
import { toast } from "sonner";
import { useAppSelector } from "../../redux/store/hooks";
import { TOrderResponse } from "../../types/responseType";
import SkeltonLoading from "../../shared/SkeltonLoading";
import EmptyMessage from "../../components/helperComponents/EmptyMessage";





const Orders = () => {
  const navigate = useNavigate()
  const loggedUserId = useAppSelector((state) => state.auth.user?._id)
  if (!loggedUserId) {
    navigate("/login")
  }
  const { data: myOrders, isLoading: isOrderLoading, isError } = useMyOrderQuery(loggedUserId!)
  if (isError) toast.warning("Failed to load data! Check your internet connection")

  const columns: ColumnDef<TOrderResponse>[] = [
    {
      header: "id",
      accessorKey: "_id",
    },
    {
      header: "amount",
      accessorKey: "total",
    },
    {
      header: "quantity",
      cell: (info) => {
        const quantity = info.row.original.ordersItem.reduce((total, item) => total + item.quantity, 0)
        return <>{quantity}</>
      }
    },
    {
      header: "discount",
      accessorKey: "discount",
    },
    {
      header: "status",
      accessorKey: "status",
    },
    {
      header: "action",
      accessorKey: "action",
      cell: (row) => row.getValue(),
    }
  ];

  return (
    <div className="orderPage">

      <h1>My Orders</h1>
      <main>
        {
          isOrderLoading ? <SkeltonLoading /> : <>

            {
              myOrders?.data && myOrders?.data?.length <= 0 || isError ? <EmptyMessage message="You have no order" url={"/search"} pageName="Go to product page" /> :
                <TableHOC<TOrderResponse>
                  data={myOrders?.data || []}
                  columns={columns}
                  heading="Orders"
                  containerClassName="orderTable"
                />
            }

          </>
        }
      </main>
    </div>
  )
}
export default Orders
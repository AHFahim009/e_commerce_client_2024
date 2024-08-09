import { ColumnDef } from "@tanstack/react-table";
import TableHOC from "../../components/dashboard/dashboardShared/TableHOC";
import { Link } from "react-router-dom";
import { useGetProductsQuery } from "../../redux/api/endpoints/product.api";
import { TProductResponse } from "../../types/responseType";

const Inventory = () => {
  const { data: productsData } = useGetProductsQuery("");

  const columns: ColumnDef<TProductResponse>[] = [
    {
      header: "Photo",
      accessorKey: "photo",
      cell: (row) => <img src={row.getValue() as string} />,
    },
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Price",
      accessorKey: "price",
    },
    {
      header: "Stock",
      accessorKey: "stock",
    },
    {
      header: "Action",
      accessorKey: "action",
      cell: (value) => {
        return (
          <Link to={`/admin/product-manage/${value.row.original._id}`}>
            manage
          </Link>
        );
      },
    },
  ];

  return (
    <div className="dashboardInventory">
      <TableHOC<TProductResponse>
        pagination={true}
        columns={columns}
        data={productsData?.data || []}
        containerClassName="inventoryTable"
        heading="Book Inventory"
      />
      <Link to="/admin/addBook" className="addBtn">
        Add
      </Link>
    </div>
  );
};
export default Inventory;

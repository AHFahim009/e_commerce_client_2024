import { ColumnDef } from "@tanstack/react-table";
import TableHOC from "../../components/dashboard/dashboardShared/TableHOC";
import { useGetAllUserQuery } from "../../redux/api/endpoints/user.api";
import { TUserResponse } from "../../types/responseType";
import SkeltonLoading from "../../shared/SkeltonLoading";
import { useState } from "react";
import UserDeleteBox from "./UserDeleteBox";
import { toast } from "sonner";
import EmptyMessage from "../../components/helperComponents/EmptyMessage";
import { useAppSelector } from "../../redux/store/hooks";
import { useNavigate } from "react-router-dom";

const Visitors = () => {
  const [userId, setUserId] = useState("");
  const [isDelete, setIsDelete] = useState(false);
  const navigate = useNavigate()
  const currentUser = useAppSelector((state) => state?.auth?.user?.email);
  // safe case: if no user logged in then redirect to login page!
  if (!currentUser) navigate("/login")


  const {
    data: allUser,
    isLoading: isAllUserLoading,
    isError,
  } = useGetAllUserQuery("");
  if (isError)
    toast.warning("Failed to load data. Check your internet connection");
  const handleDeleteUser = (id: string) => {
    setIsDelete(true);
    setUserId(id);
  };

  const columns: ColumnDef<TUserResponse>[] = [
    {
      header: "Photo",
      accessorKey: "photo",
      cell: (row) => <img src={row.getValue() as string} />,
    },
    {
      header: "Name",
      cell: (info) => {
        const email = info.row.original.email;
        return (
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            {currentUser === email ? (
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  backgroundColor: "green",
                  borderRadius: "10px",
                }}
              ></div>
            ) : null}
            {info.row.original.name}
          </div>
        );
      },
    },
    {
      header: "Gender",
      accessorKey: "gender",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Role",
      accessorKey: "role",
    },
    {
      header: "Action",
      accessorKey: "action",
      cell: (info) => {
        const userEmail = info.row.original.email
        return (
          <>
            {
              currentUser === userEmail ? null : <button
                onClick={() => {
                  handleDeleteUser(info.row.original._id);
                }}
              >
                Delete
              </button>
            }
          </>
        );
      },
    },
  ];

  return (
    <div className="ourUsersPage">
      {isAllUserLoading ? (
        <SkeltonLoading />
      ) : (
        <>
          {(allUser?.data && allUser?.data?.length === 0) || isError ? (
            <EmptyMessage message="There is no users" />
          ) : (
            <TableHOC
              heading="Our Users"
              containerClassName="ourUsersTable"
              columns={columns}
              data={allUser?.data || []}
              pagination={true}
            />
          )}
        </>
      )}
      {isDelete && <UserDeleteBox userId={userId} setIsDelete={setIsDelete} />}
    </div>
  );
};
export default Visitors;

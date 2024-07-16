import { TUser } from "@/redux/features/auth/authSlice";
import {
  useChangeUserRoleMutation,
  useDeleteUserMutation,
  useGetUsersQuery,
} from "@/redux/features/user/userApi";
import { Button, Pagination, Table, TableColumnsType, TableProps } from "antd";
import { useState } from "react";
import { toast } from "sonner";

export type TTableData = Pick<TUser, "name" | "email" | "role">;

const AllUsers = () => {
  const [page, setPage] = useState(1);
  const userQuery = [
    {
      name: "page",
      value: page,
    },
    {
      name: "sort",
      value: "role",
    },
  ];

  const { data, isFetching, isLoading } = useGetUsersQuery(userQuery); //* new to set testing
  const [changeRole] = useChangeUserRoleMutation();
  const [deleteUser] = useDeleteUserMutation();
  
  const users = (data?.data as any)?.filter((user: any) => !user.isDeleted);
  // console.log(users);
  
  const metaData = users?.meta;

  const handleMakeAdmin = (userId: string) => {
    const toastId = toast.loading("User role change in!");
    try {
      const userInfo = {
        userId: userId,
        role: "admin",
      };
      toast.success("User role change to admin successfully!", {
        id: toastId,
        duration: 2000,
      });

      //* Change user role into DB
      changeRole(userInfo);
    } catch (error: any) {
      toast.error(error?.message, { id: toastId });
    }
  };

  const handleMakeSeller = (userId: string) => {
    const toastId = toast.loading("User role change in!");
    try {
      const userInfo = {
        userId: userId,
        role: "seller",
      };
      toast.success("User role change to seller successfully!", {
        id: toastId,
        duration: 2000,
      });

      //* Change user role into DB
      changeRole(userInfo);
    } catch (error: any) {
      toast.error(error?.message, { id: toastId });
    }
  };

  const handleMakeBuyer = (userId: string) => {
    const toastId = toast.loading("User role change in!");
    try {
      const userInfo = {
        userId: userId,
        role: "buyer",
      };
      toast.success("User role change to seller successfully!", {
        id: toastId,
        duration: 2000,
      });

      //* Change user role into DB
      changeRole(userInfo);
    } catch (error: any) {
      toast.error(error?.message, { id: toastId });
    }
  };

  const handleDeleteUser = (userId: string) => {
    const toastId = toast.loading("User delete in!");
    try {
      toast.success("User delete successfully!", {
        id: toastId,
        duration: 2000,
      });
      
      const userInfo = {
        userId,
        isDeleted: true,
      }
      //* Delete user into DB
      deleteUser(userInfo);
    } catch (error: any) {
      toast.error(error?.message, { id: toastId });
    }
  };

  const tableData = users?.map(({ _id, name, email, role }: TUser) => ({
    key: _id,
    name,
    email,
    role,
  }));

  const columns: TableColumnsType<TTableData> = [
    {
      title: "user",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
    },
    {
      title: "Action",
      key: "x1",
      render: (item) => {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              style={{ fontSize: "12px", fontWeight: "600" }}
              onClick={() => handleMakeAdmin(item?.key)}
              type="link"
              size="small"
              disabled={item.role === "admin"}
            >
              admin
            </Button>
            <Button
              style={{ fontSize: "12px", fontWeight: "600" }}
              onClick={() => handleMakeSeller(item?.key)}
              type="link"
              size="small"
              disabled={item.role === "admin" || item.role === "seller"}
            >
              seller
            </Button>
            <Button
              style={{ fontSize: "12px", fontWeight: "600" }}
              onClick={() => handleMakeBuyer(item?.key)}
              type="link"
              size="small"
              disabled={item.role === "admin" || item.role === "buyer"}
            >
              buyer
            </Button>
          </div>
        );
      },
    },
    {
      title: "Action",
      key: "x3",
      render: (item) => {
        return (
          <div>
            <Button
              style={{ fontSize: "12px", fontWeight: "600" }}
              onClick={() => handleDeleteUser(item?.key)}
              danger
              type="link"
              size="small"
              disabled={item.role === "admin"}
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    console.log(_pagination, filters, _sorter, extra);

    if (isLoading) {
      return <p>Loading...</p>;
    }
  };

  return (
    <div>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        pagination={false}
      />
      <Pagination
        style={{ marginTop: "20px" }}
        current={page}
        onChange={(value) => setPage(value)}
        pageSize={metaData?.limit}
        total={metaData?.total}
      />
    </div>
  );
};

export default AllUsers;

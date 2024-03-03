import { TUser } from "@/redux/features/auth/authSlice";
import {
  useChangeUserRoleMutation,
  useDeleteUserMutation,
  useGetUsersQuery,
} from "@/redux/features/user/userApi";
import { Button, Pagination, Table, TableColumnsType, TableProps } from "antd";
import { useState } from "react";
import { toast } from "sonner";

export type TTableData = Pick<TUser, "username" | "email" | "role">;

const AllUsers = () => {
  const [page, setPage] = useState(1);
  const {
    data: users,
    isFetching,
    isLoading,
  } = useGetUsersQuery([
    {
      name: "page",
      value: page,
    },
    {
      name: "sort",
      value: "role",
    },
  ]);
  const [changeRole] = useChangeUserRoleMutation();
  const [deleteUser] = useDeleteUserMutation();

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
      
      //* Delete user into DB
      deleteUser(userId);
    } catch (error: any) {
      toast.error(error?.message, { id: toastId });
    }
  };

  const tableData = users?.data?.map(({ _id, username, email, role }) => ({
    key: _id,
    username,
    email,
    role,
  }));

  const columns: TableColumnsType<TTableData> = [
    {
      title: "user",
      dataIndex: "username",
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
            >
              admin
            </Button>
            <Button
              style={{ fontSize: "12px", fontWeight: "600" }}
              onClick={() => handleMakeSeller(item?.key)}
              type="link"
              size="small"
              disabled={item.role === "admin"}
            >
              seller
            </Button>
            <Button
              style={{ fontSize: "12px", fontWeight: "600" }}
              onClick={() => handleMakeBuyer(item?.key)}
              type="link"
              size="small"
              disabled={item.role === "admin"}
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

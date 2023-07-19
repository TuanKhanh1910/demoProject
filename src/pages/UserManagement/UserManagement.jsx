import { Drawer } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormAddUser from "../../Components/FormAddUser/FormAddUser";
import TableUser from "../../Components/TableUser/TableUser";
import { getAllUser } from "../../redux/slices/userSlice";
import { userServ } from "../../services/userServices";

const UserManagement = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);

  useEffect(() => {
    // userServ
    //   .getAllUser()
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((erro) => {
    //     console.log(erro);
    //   });
    dispatch(getAllUser());
  }, []);

  console.log("users: ", users);
  //   một hàm vừa gọi dữ liệu vừa bắn dữ liệu lên redux
  // redux ko cho phép gọi bất đồng bộ bên trên Redux
  // redux-thunk là một middl

  // các data về drwer
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button
        id="btnThem"
        onClick={showDrawer}
        className="bg-green-600 py-2 px-5 rounded-lg mb-3"
      >
        Thêm mới
      </button>
      <TableUser />
      <Drawer
        title="Thêm người dùng"
        placement="right"
        onClose={onClose}
        open={open}
        size="large"
      >
        <FormAddUser />
      </Drawer>
    </div>
  );
};

export default UserManagement;

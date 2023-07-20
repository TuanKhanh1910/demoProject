import React, { useEffect, useState } from "react";
import { Button, message, Popconfirm, Space, Table, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { userServ } from "../../services/userServices";
import userSlice, {
  getAllUser,
  getAllUserAPI,
  layThongTin,
} from "../../redux/slices/userSlice";
import { Formik } from "formik";
import "./TableUser.scss";
import { setButton } from "../../redux/slices/btnSlice";

const TableUser = () => {
  // const [btnReadOnly, setbtnReadOnly] = useState(false);
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);
  //   console.log("users: ", users);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      //   có thể custom lại cái hiển thị cột
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Họ và Tên",
      dataIndex: "hoTen",
      key: "hoTen",
    },
    {
      title: "Tài khoản",
      dataIndex: "taiKhoan",
      key: "taiKhoan",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "soDT",
      key: "soDT",
    },
    {
      title: "Loại người dùng",
      key: "maLoaiNguoiDung",
      dataIndex: "maLoaiNguoiDung",
      render: (text, record, index) => {
        // render sẽ chứa 3 tham số:
        // text sẽ là cái giá trị của thuộc tính đó trong data
        // console.log("text: ", text);
        // record sẽ là chứa các phần tử trong mảng data
        // console.log("record: ", record);
        // index sẽ là vị trí của những phần tử đó trong mảng
        // console.log("index: ", index);

        return (
          <Tag color={text == "QuanTri" ? "magenta" : "green"}>
            {text == "QuanTri" ? "Quản Trị" : "Khách Hàng"}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            id="popconfirm"
            title="Delete the task"
            description="bạn có muốn xóa người dùng này"
            onConfirm={() => {
              userServ
                .deleteUser(record.taiKhoan)
                .then((res) => {
                  dispatch(getAllUserAPI());
                  message.success("Đã xóa thành công");
                })
                .catch((erro) => {
                  alert("có vấn đề xảy ra");
                });
            }}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <button
              className="py-2 px-5 bg-red-600 text-white rounded-lg hover:bg-red-800 duration-500"
              // sẽ sửa lại thêm một popconfirm vào để hỏi người dùng có muốn xóa hay không và thêm thông báo khi xóa thành công cũng như thất bại
            >
              Delete
            </button>
          </Popconfirm>

          <button
            onClick={() => {
              dispatch(layThongTin(record.taiKhoan));
              document.getElementById("btnThem").click();
              dispatch(setButton());
              // document.querySelector("#taiKhoanInput").readOnly = true;
              // console.log(document.querySelector("#taiKhoanInput").readOnly);
              // setbtnReadOnly(true);
              // dispatch()
            }}
            className="py-2 px-5 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 duration-500"
          >
            Edit
          </button>
        </Space>
      ),
    },
  ];

  const cancel = (e) => {
    console.log(e);
    message.error("Click on No");
  };

  let newUser = users.map((item, index) => {
    return { ...item, id: index + 1 };
  });

  return (
    <div>
      <Table columns={columns} dataSource={users.length > 0 && newUser} />
    </div>
  );
};

export default TableUser;

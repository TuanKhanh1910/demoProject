import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { userServ } from "../../services/userServices";
import { luuXuongLocal } from "../../util/localStore";
import { message } from "antd";

const FormLoginAdmin = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
    },
    onSubmit: (values) => {
      userServ
        .login(values)
        .then((res) => {
          console.log(res);
          //   check mã loại người dùng để có đủ điều kiện để vào trang admin hay ko
          if (res.data.content.maLoaiNguoiDung == "QuanTri") {
            // lưu dữ liệu xuống local và chuyển hướng tới trang admin
            luuXuongLocal("user", res.data.content);
            messageApi.success("đăng nhập thành công");
            setTimeout(() => {
              navigate("/admin");
            }, [1000]);
          } else {
            // đá về trang trủ của phim
            messageApi.error("bạn không phải là quản trị");
            setTimeout(() => {
              window.location.href = "http://localhost:3000/";
            }, [1000]);
          }
        })
        .catch((err) => {
          console.log(err);
          messageApi.error(err.response.data.content);
          // clear hết input trong form
          formik.resetForm();
        });
    },
    validationSchema: yup.object({
      taiKhoan: yup.string().required("Vui lòng nhập tài khoản"),
      matKhau: yup.string().required("Vui lòng nhập mật khẩu"),
    }),
  });
  const { handleSubmit, handleChange, handleBlur } = formik;
  const { taiKhoan, matKhau } = formik.errors;
  return (
    <div>
      {contextHolder}
      <h2 className="font-bold text-2xl">Login Admin</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="first_name"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Tài khoản
          </label>
          <input
            onChange={handleChange}
            onBlur={handleBlur}
            value={formik.values.taiKhoan}
            type="text"
            name="taiKhoan"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Nhập tài khoản"
          />
          {taiKhoan && formik.touched.taiKhoan ? (
            <p className="text-red-500">{taiKhoan}</p>
          ) : (
            ""
          )}
        </div>
        <div>
          <label
            htmlFor="matKhau"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Mật khẩu
          </label>
          <input
            onChange={handleChange}
            onBlur={handleBlur}
            value={formik.values.matKhau}
            type="password"
            name="matKhau"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Nhập mật khẩu"
          />
          {matKhau && formik.touched.matKhau ? (
            <p className="text-red-500">{matKhau}</p>
          ) : (
            ""
          )}
        </div>
        <button
          type="submit"
          className="py-1 px-3 rounded bg-green-700 text-white"
        >
          Đăng nhập
        </button>
      </form>
    </div>
  );
};

export default FormLoginAdmin;

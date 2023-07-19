import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Input, message } from "antd";
import { userServ } from "../../services/userServices";
import { luuXuongLocal } from "../../util/localStore";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setDuLieuHoTen } from "../../redux/slices/userSlice";

const FormLogin = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
    },
    onSubmit: (values) => {
      console.log(values);
      //   gửi dữ liệu lên sever:
      userServ
        .login(values)
        .then((result) => {
          console.log(result);
          //   nếu như login thành công sẽ lưu thông tin xuống local và chuyển hương người dùng về trang chủ
          messageApi.success("đăng nhập thành công");
          //   khi gọi dữ liệu thành công, sẽ lấy dữ liệu đó gửi lên redux
          dispatch(setDuLieuHoTen(result.data.content));
          luuXuongLocal("user", result.data.content);
          setTimeout(() => {
            navigate("/");
          }, [1000]);
        })
        .catch((error) => {
          console.log(error);
          messageApi.error(error.response.data.content);
        });
    },
    validationSchema: yup.object({
      taiKhoan: yup.string().required("Vui nhập đầy đủ"),
      matKhau: yup
        .string()
        .required("Vui lòng nhập mật khẩu")
        .min(3, "vui lòng nhập trên 3 chữ số"),
    }),
  });
  const { handleSubmit, handleChange, handleBlur } = formik;
  const { taiKhoan, matKhau } = formik.errors;
  return (
    <div>
      {contextHolder}
      <form onSubmit={handleSubmit}>
        {/* //   sử dụng onSubmit từ thư viện formik */}
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Tài Khoản
          </label>
          {/* <input
            //   sử dụng onchange từ thư viện formik
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            name="taiKhoan"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="nhập tài khoản"
          /> */}
          <Input
            name="taiKhoan"
            onChange={handleChange}
            onBlur={handleBlur}
            status={taiKhoan && formik.touched.taiKhoan ? "error" : ""}
            placeholder="nhập tài khoản"
          />
          {taiKhoan && formik.touched.taiKhoan ? (
            <p className="text-red-500">{taiKhoan}</p>
          ) : (
            ""
          )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Mật Khẩu
          </label>
          {/* <input
            //   sử dụng onchange từ thư viện formik
            onChange={handleChange}
            onBlur={handleBlur}
            type="password"
            name="matKhau"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          /> */}
          <Input
            name="matKhau"
            onChange={handleChange}
            onBlur={handleBlur}
            status={matKhau && formik.touched.matKhau ? "error" : ""}
            type="password"
          />
          {matKhau && formik.touched.matKhau ? (
            <p className="text-red-500">{matKhau}</p>
          ) : (
            ""
          )}
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Đăng nhập
        </button>
      </form>
    </div>
  );
};

export default FormLogin;

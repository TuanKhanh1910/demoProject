import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUser,
  getAllUserAPI,
  updateUser,
  updateUserAPI,
} from "../../redux/slices/userSlice";
import { userServ } from "../../services/userServices";
import * as yup from "yup";

const FormAddUser = () => {
  const { changeUsers } = useSelector((state) => state.user);
  const { isBtn } = useSelector((state) => state.btnReadOnly);
  // console.log("changeUsers: ", changeUsers);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDT: "",
      maNhom: "",
      maLoaiNguoiDung: "",
      hoTen: "",
    },
    onSubmit: async (values) => {
      // userServ
      //   .addUser(values)
      //   .then((res) => {
      //     console.log(res);
      //   })
      //   .catch((erro) => {
      //     console.log(erro);
      //   });
      try {
        // console.log(values);
        const res = await userServ.addUser(values);
        // console.log("res: ", res);
        dispatch(getAllUserAPI());
        formik.resetForm();
        document.querySelector(".ant-drawer-close").click();
      } catch (error) {
        // console.log(error);
      }
    },
    validationSchema: yup.object({
      taiKhoan: yup.string().required("Vui nhập đầy đủ"),
      matKhau: yup.string().required("Vui lòng nhập mật khẩu"),
      email: yup
        .string()
        .email("vui lòng nhập đúng email")
        .required("Vui nhập đầy đủ"),
      soDT: yup
        .string()
        .matches(/^[0-9]*$/, "vui lòng chỉ nhập số")
        .max(10, "vui lòng nhập đúng số điện thoại")
        .min(10, "vui lòng nhập đúng số điện thoại")
        .required("Vui nhập đầy đủ"),
      hoTen: yup
        .string()
        .required("Vui nhập đầy đủ")
        .matches(/^[\p{L} ]+$/u, "vui lòng chỉ nhập chữ"),
      maNhom: yup.string().required("vui lòng nhập đầy đủ "),
    }),
  });
  useEffect(() => {
    if (changeUsers) {
      formik.setValues(changeUsers);
    }
  }, [changeUsers]);
  const { handleChange, handleSubmit, values, handleBlur } = formik;
  const { taiKhoan, matKhau, email, soDT, maNhom, maLoaiNguoiDung, hoTen } =
    formik.errors;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="relative z-0 w-full mb-6 group">
          <input
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            name="hoTen"
            value={values.hoTen || ""}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          {hoTen && formik.touched.hoTen ? (
            <p className="text-red-500">{hoTen}</p>
          ) : (
            ""
          )}
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Họ và Tên
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            name="email"
            value={values.email || ""}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          {email && formik.touched.email ? (
            <p className="text-red-500">{email}</p>
          ) : (
            ""
          )}
          <label
            htmlFor="floating_password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            onChange={handleChange}
            onBlur={handleBlur}
            type="password"
            name="matKhau"
            value={values.matKhau || ""}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          {matKhau && formik.touched.matKhau ? (
            <p className="text-red-500">{matKhau}</p>
          ) : (
            ""
          )}
          <label
            htmlFor="matKhau"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Mật Khẩu
          </label>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <input
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              name="soDT"
              value={values.soDT || ""}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            {soDT && formik.touched.soDT ? (
              <p className="text-red-500">{soDT}</p>
            ) : (
              ""
            )}
            <label
              htmlFor="floating_first_name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Số Điện Thoai
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              readOnly={isBtn}
              id="taiKhoanInput"
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              name="taiKhoan"
              value={values.taiKhoan || ""}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            {taiKhoan && formik.touched.taiKhoan ? (
              <p className="text-red-500">{taiKhoan}</p>
            ) : (
              ""
            )}
            <label
              htmlFor="floating_last_name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Tài Khoản
            </label>
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <input
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              name="maNhom"
              value={values.maNhom || ""}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            {maNhom && formik.touched.maNhom ? (
              <p className="text-red-500">{maNhom}</p>
            ) : (
              ""
            )}
            <label
              htmlFor="floating_phone"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Mã Nhóm
              <span className="text-red-500">
                (Vui lòng chỉ nhập từ GP01 tới GP09)
              </span>
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group mt-3  ">
            <div>
              <label
                htmlFor="maLoaiNguoiDung"
                className="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-400"
              >
                Chọn người dùng
              </label>
              <select
                onChange={handleChange}
                onBlur={handleBlur}
                name="maLoaiNguoiDung"
                value={values.maLoaiNguoiDung || ""}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="QuanTri">Quản trị</option>
                <option value="KhachHang">Khách hàng</option>
              </select>
              {maLoaiNguoiDung && formik.touched.maLoaiNguoiDung ? (
                <p className="text-red-500">{maLoaiNguoiDung}</p>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mr-3"
        >
          Thêm người dùng
        </button>
        <button
          onClick={() => {
            userServ
              .updateUser(formik.values)
              .then((res) => {
                console.log(res);
                dispatch(updateUserAPI(res.data.content));
                // dispatch(getAllUserAPI());
                document.querySelector(".ant-drawer-close").click();
                formik.resetForm();
                // console.log("res.data.content: ", res.data.content);
              })
              .catch((error) => {
                console.log(error);
              });
          }}
          type="button "
          className="text-white bg-yellow-500 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800"
        >
          Cập nhật
        </button>
      </form>
    </div>
  );
};

export default FormAddUser;

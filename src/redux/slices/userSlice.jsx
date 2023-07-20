import { layDuLieuLocal } from "../../util/localStore";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userServ } from "../../services/userServices";

// nơi tạo các createAsyncThunk để xử lí các bất đôngg bộ trước khi bắn dữ liệu lên store bằng redux-thunk
// bên trong createAsyncThunk sẽ có 2 tham số, là một type của hàm, thứ 2 sẽ là hàm cần xử lí bất đồng bộ
export const getAllUserAPI = createAsyncThunk(
  "user/getAllUserAPI",
  async () => {
    const res = await userServ.getAllUser();
    return res.data.content;
  }
);

export const updateUserAPI = createAsyncThunk(
  "user/updateUserAPI",
  async () => {
    const res = await userServ.getAllUser();
    console.log("res: ", res);

    return res.data.content;
  }
);

const initialState = {
  hoTen: layDuLieuLocal("user"),
  users: [],
  changeUsers: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // là nơi viết ra các method,
    setDuLieuHoTen: (state, action) => {
      console.log("action: ", action);
      // check xem hoTen có dữ liêu hay không, nếu ko có set dữ liệu cho nó
      if (state.hoTen == null) {
        state.hoTen = action.payload;
      }
    },
    layThongTin: (state, action) => {
      let infoUser = state.users.find(
        (user) => user.taiKhoan == action.payload
      );
      // console.log("action.payload: ", action.payload);
      // console.log("infoUser: ", infoUser);
      state.changeUsers = infoUser;
    },
    // updateUser: (state, action) => {
    //   let index = state.users.findIndex(
    //     (item) => item.taiKhoan == action.payload.taiKhoan
    //   );
    //   console.log("action.payload: ", action.payload);
    //   console.log("action.payload.taiKhoan: ", action.payload.taiKhoan);
    //   console.log("index: ", index);
    //   // console.log("action.payload: ", action.payload.taiKhoan);
    // },
  },
  //extraReducers giúp tách biệt các logic bất đồng bộ ra khỏi reducer vì khi xử lí bất đồng bộ có nhiều trường hợp xảy ra
  extraReducers: (builder) => {
    // khi xử lí bên trong hàm sẽ có 3 phương thức tương ứng với các trường hợp chạy thành công,đang chạy, thất bại

    // khi chạy thành công sẽ chấm tới fulfilled
    // khi đang chạy là pending
    // chạy thất bại là reject
    builder.addCase(getAllUserAPI.fulfilled, (state, action) => {
      // console.log("action: ", action);
      state.users = action.payload;
    });
    // khi gặp lỗi
    builder.addCase(getAllUserAPI.rejected, (state, action) => {
      state.users = [
        {
          hoTen: "A",
          maLoaiNguoiDung: "QuanTri",
        },
      ];
    });

    builder.addCase(updateUserAPI.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    builder.addCase(updateUserAPI.rejected, (state, action) => {
      console.log("action.payload: ", action.payload);
      // console.log("state: ", state);
    });
  },
});

export const { setDuLieuHoTen, layThongTin, updateUser } = userSlice.actions;
// để sử dụng trong component

export default userSlice.reducer;
// import trong store của redux

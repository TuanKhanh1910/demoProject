import { https } from "./config";

export const rapServ = {
  // lấy thông tin hệ thống rạp
  getAllHeThongRap: () => {
    return https.get("api/QuanLyRap/LayThongTinHeThongRap");
  },
  //   lấy thông tin lịch chiếu hệ thống rap
  getAllLichChieuHethong: (maHeThongRap) => {
    return https.get(
      `api/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${maHeThongRap}&maNhom=GP09`
    );
  },
};

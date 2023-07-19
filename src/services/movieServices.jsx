import { https } from "./config";

export const movieServ = {
  getAllBanner: () => {
    return https.get("/api/QuanLyPhim/LayDanhSachBanner");
  },
  getAllMovie: () => {
    return https.get("api/QuanLyPhim/LayDanhSachPhim?maNhom=GP09");
  },
};

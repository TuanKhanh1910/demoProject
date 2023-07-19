import { Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { rapServ } from "../../services/rapServices";
import momnet from "moment";
import "./tabMovie.scss";

const TabMovieItem = ({ maHeThongRap }) => {
  const [lichchieu, setlichchieu] = useState([]);
  useEffect(() => {
    rapServ.getAllLichChieuHethong(maHeThongRap).then((result) => {
      console.log(result);
      setlichchieu(result.data.content);
    });
  }, [maHeThongRap]);
  //   phải sử dụng componentUpdating vì khi mỗi lần người dùng bấm vào hệ thống rạp khác nhau, thì nó sẽ tự động xác định rằng ứng với từng rap nó sẽ chạy lại 1 cái rạp khác

  const renderLichChieuAllRap = () => {
    // lichChieu[0] ? có nghĩa là nếu phần tử đầu tiên của mảng có thì mới .lstCumRap và map
    return lichchieu[0]?.lstCumRap.map((item, index) => {
      return {
        label: (
          <div className="text-left w-60">
            <p>{item.tenCumRap}</p>
            <p className="truncate">{item.diaChi}</p>
          </div>
        ),
        key: index,
        children: (
          <div
            style={{ maxHeight: "400px", overflowY: "scroll" }}
            className="space-y-5"
          >
            {item.danhSachPhim.map((item, index) => {
              if (item.dangChieu) {
                return (
                  <div className="flex" key={index}>
                    <div className="w-2/12">
                      <img src={item.hinhAnh} alt="" />
                    </div>
                    <div className="w-10/12 mx-5">
                      <h3>{item.tenPhim}</h3>
                      <div className="flex flex-wrap">
                        {item.lstLichChieuTheoPhim
                          .slice(0, 5)
                          .map((suatChieu, index) => {
                            return (
                              <p
                                className="my-2 text-red-500 w-1/2 border border-black rounded-md py-2 px-4 mb-5"
                                key={index}
                              >
                                {momnet(suatChieu.ngayChieuGioChieu).format(
                                  "MMMM Do YYYY, h:mm:ss a"
                                )}
                              </p>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        ),
      };
    });
  };

  return <Tabs id="tab" tabPosition="left" items={renderLichChieuAllRap()} />;
};

export default TabMovieItem;

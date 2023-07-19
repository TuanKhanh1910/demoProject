import React, { useEffect, useState } from "react";
import { Carousel } from "antd";
import axios from "axios";
import { https } from "../../services/config";
import { movieServ } from "../../services/movieServices";
const contentStyle = {
  margin: 0,
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const HomeBanner = () => {
  const [banner, setbanner] = useState([]);

  const getAllBanner = async () => {
    const res = await movieServ.getAllBanner();
    console.log(res);
    setbanner(res.data.content);
  };

  useEffect(() => {
    getAllBanner();
  }, []);

  return (
    <div>
      <Carousel>
        {banner.map((banner, index) => {
          return (
            <div key={index} className="h-100vh object-cover">
              <img className="w-full " src={banner.hinhAnh} alt="" />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default HomeBanner;

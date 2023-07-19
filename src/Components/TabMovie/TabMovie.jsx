import { Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { rapServ } from "../../services/rapServices";
import TabMovieItem from "./TabMovieItem";

const TabMovie = () => {
  const [rap, setRap] = useState([]);
  useEffect(() => {
    rapServ
      .getAllHeThongRap()
      .then((result) => {
        console.log(result);
        setRap(result.data.content);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const renderItemTab = () => {
    return rap.map((item, index) => {
      return {
        label: (
          <div>
            <img className="w-10 h-10" src={item.logo} alt="" />
            <p>{item.tenHeThongRap}</p>
          </div>
        ),
        key: index,
        children: <TabMovieItem maHeThongRap={item.maHeThongRap} />,
      };
    });
  };

  return (
    <div className="max-w-screen-xl mx-auto mb-7">
      <Tabs tabPosition="left" items={renderItemTab()} />
    </div>
  );
};

export default TabMovie;

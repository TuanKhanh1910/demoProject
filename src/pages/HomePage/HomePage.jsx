import React from "react";
import HomeBanner from "../../Components/HomeBanner/HomeBanner";
import ListMovie from "../../Components/ListMovie/ListMovie";
import TabMovie from "../../Components/TabMovie/TabMovie";

const HomePage = () => {
  return (
    <div>
      <HomeBanner />
      {/* danh sách phim */}
      <ListMovie />
      {/* các tab hệ thống rạp */}
      <TabMovie />
    </div>
  );
};

export default HomePage;

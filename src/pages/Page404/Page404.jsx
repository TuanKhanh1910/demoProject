import { Button } from "antd";
import React from "react";
import Lottie from "react-lottie";
import { NavLink } from "react-router-dom";
import * as animation404 from "./../../assets/animation/animation404.json";

const Page404 = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animation404,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <Lottie options={defaultOptions} height={400} width={400} />
      <NavLink to="/">
        <Button type="primary" danger>
          Quay về trang chủ
        </Button>
      </NavLink>
    </div>
  );
};

export default Page404;

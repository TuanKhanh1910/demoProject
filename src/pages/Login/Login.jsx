import React from "react";
import Lottie from "react-lottie";
import FormLogin from "../../Components/FormLogin/FormLogin";
import * as animationLogin from "./../../assets/animation/animation_login.json";
const Login = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationLogin,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="flex">
      <div className="w-1/2">
        <Lottie options={defaultOptions} height={400} width={400} />
      </div>
      <div className="w-1/2">
        <FormLogin />
      </div>
    </div>
  );
};

export default Login;

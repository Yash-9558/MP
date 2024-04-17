import React, { useEffect, useState } from "react";
import classes from "./index.module.css";
import Signin from "../../components/Auth/Signin";
import Signup from "../../components/Auth/Signup";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { STATUS } from "../../utils/variables";
import { uiActions } from "../../store/ui-slice";

function Auth() {
  const dispatch = useDispatch();
  const [authPage, setAuthPage] = useState("signup");
  const authChangeHandler = () => {
    setAuthPage((prevState) => (prevState === "signup" ? "signin" : "signup"));
  };
  useEffect(() => {
    dispatch(uiActions.setIsLoadingBar({ status: STATUS.COMPLETE }));
  }, []);
  return (
    <div className={classes["auth-container"]}>
      <motion.div
        className={classes["overlay"]}
        style={{
          left: authPage === "signup" ? "50%" : "0", // Adjust values as needed
        }}
      >
        <div className={classes["overlay-text"]}>
          <h2>
            {authPage === "signup" ? "Already" : "Don't"} have an Account?{" "}
          </h2>
          <h2 onClick={authChangeHandler} className={classes["overlay-link"]}>
            {authPage === "signup" ? "Signin" : "Signup"}
          </h2>
        </div>
      </motion.div>
      <Signup />
      <Signin />
    </div>
  );
}

export default Auth;

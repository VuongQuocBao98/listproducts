import React from "react";
import LoginForm from "../LoginForm";
import { useDispatch } from "react-redux";
import { login } from "../../userSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useSnackbar } from "notistack";

function Login(props) {
  const { closeDialog } = props;

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (data) => {
    const action = login(data);
    try {
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction);
      //Close dialog
      if (closeDialog) {
        closeDialog();
      }

      console.log(user);
    } catch (error) {
      console.log("failed to login!!!");
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  return (
    <>
      <LoginForm onSubmit={handleSubmit} />
    </>
  );
}

export default Login;

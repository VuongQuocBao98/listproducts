import React from "react";

import RegisterForm from "../RegisterForm";
import { useDispatch } from "react-redux";
import { register } from "../../userSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useSnackbar } from "notistack";

function Regiter(props) {
  const { closeDialog } = props;

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (data) => {
    data.username = data.email;
    const action = register(data);
    try {
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction);
      //Close dialog
      if (closeDialog) {
        closeDialog();
      }
      enqueueSnackbar("🎉 Register Successfully !!! 🎉", {
        variant: "success",
      });
      console.log(user);
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  return (
    <>
      <RegisterForm onSubmit={handleSubmit} />
    </>
  );
}

export default Regiter;

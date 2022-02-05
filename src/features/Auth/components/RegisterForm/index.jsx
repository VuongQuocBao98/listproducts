import React from "react";
import PropTypes from "prop-types";
import InputField from "../../../../components/FormControl/InputField";
import PasswordField from "../../../../components/FormControl/PasswordField";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Avatar, Button, LinearProgress, Typography } from "@mui/material";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import { makeStyles } from "@mui/styles";
import CheckBox from "../../../../components/FormControl/CheckBox";

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
};
const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "0px",
  },
  avatar: {
    marginBottom: "10px",
    marginTop: "0px",
    marginInline: "auto",
    background: "#c51162 !important",
  },

  title: {
    textAlign: "center",
    fontWeight: "bold !important",
  },
  submit: {
    marginTop: "1rem !important",
  },
}));

function RegisterForm(props) {
  const classes = useStyles();
  const { onSubmit } = props;
  const schema = yup
    .object({
      fullName: yup
        .string("FullName must be a string")
        .required("Please enter your FullName")
        .min(8, "FullName should has at least 8 character"),
      isAccept: yup.boolean().oneOf([true], "You have must agree to terms"),
      email: yup
        .string("Email must be a string")
        .email("Please enter a valid Email address")
        .required("Please enter your Email"),
      password: yup
        .string("Password must be a string")
        .required("Please enter password")
        .matches(
          /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,32}$/,
          "Password must be minimun 8 nad maximum characters including at least 1 uppercase letter, 1 lowercase letter and 1 number"
        ),
      retypePassword: yup
        .string("Password must be a string")
        .oneOf([yup.ref("password")], "Password does not match")
        .required("Please retype your password"),
    })
    .required();

  const form = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      retypePassword: "",
      isAccept: false,
    },
    resolver: yupResolver(schema),
  });
  const handleSubmit = async (values) => {
    if (onSubmit) await onSubmit(values);
  };

  const { isSubmitting } = form.formState;
  return (
    <div className={classes.root}>
      {isSubmitting && <LinearProgress />}
      <Avatar className={classes.avatar}>
        <LockRoundedIcon />
      </Avatar>
      <Typography variant="h5" component="h3" className={classes.title}>
        Create An Account
      </Typography>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name="fullName" label="FullName" form={form} />
        <InputField name="email" label="Email" form={form} />
        <PasswordField
          isShowPassword={false}
          name="password"
          label="New Password"
          form={form}
        />
        <PasswordField
          isShowPassword={false}
          name="retypePassword"
          label="Retype Password"
          form={form}
        />
        <CheckBox
          form={form}
          name="isAccept"
          label="Do you agree to term of shop ?"
        />

        <Button
          color="primary"
          variant="contained"
          fullWidth
          className={classes.submit}
          type="submit"
        >
          Confirm Register
        </Button>
      </form>
    </div>
  );
}

export default RegisterForm;

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

LoginForm.propTypes = {
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
    background: "#2196f3 !important",
  },

  title: {
    textAlign: "center",
    fontWeight: "bold !important",
  },
  submit: {
    marginTop: "1rem !important",
  },
}));

function LoginForm(props) {
  const classes = useStyles();
  const { onSubmit } = props;
  const schema = yup
    .object({
      identifier: yup
        .string("Email must be a string")
        .email("Please enter a valid Email address")
        .required("Please enter your Email"),
      password: yup
        .string("Password must be a string")
        .required("Please enter password"),
    })
    .required();

  const form = useForm({
    defaultValues: {
      identifier: "",
      password: "",
      rememberMe: false,
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
        Sign In
      </Typography>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name="identifier" label="Email" form={form} />
        <PasswordField
          isShowPassword={false}
          name="password"
          label="Password"
          form={form}
        />
        <CheckBox name="rememberMe" label="Remember me ✔" form={form} />
        <Button
          color="primary"
          variant="contained"
          fullWidth
          className={classes.submit}
          type="submit"
        >
          Sign in
        </Button>
      </form>
    </div>
  );
}

export default LoginForm;

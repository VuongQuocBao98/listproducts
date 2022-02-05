import React from "react";
import PropTypes from "prop-types";
import InputField from "../../components/FormControl/InputField";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Avatar, Button, Typography } from "@mui/material";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import { makeStyles } from "@mui/styles";
import { useForm } from "react-hook-form";

Example.propTypes = {
  onSubmit: PropTypes.func,
};
const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "10px",
  },
  avatar: {
    marginBottom: "15px",
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

function Example(props) {
  const classes = useStyles();

  const schema = yup
    .object({
      fullName: yup.string("FullName must be a string"),
    })
    .required();

  const form = useForm({
    defaultValues: {
      fullName: "",
    },
    resolver: yupResolver(schema),
  });
  const handleSubmit = (values) => {
    form.reset();
    console.log(values);
  };
  return (
    <div className={classes.root}>
      <Avatar className={classes.avatar}>
        <LockRoundedIcon />
      </Avatar>
      <Typography variant="h5" component="h3" className={classes.title}>
        Create An Account
      </Typography>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name="fullName" label="FullName" form={form} />

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

export default Example;

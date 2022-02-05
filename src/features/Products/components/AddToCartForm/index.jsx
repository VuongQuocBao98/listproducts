import React from "react";
import PropTypes from "prop-types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";

import NumberField from "../../../../components/FormControl/NumberField";
import { useSnackbar } from "notistack";
AddToCartForm.propTypes = {
  onSubmit: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  button: {
    color: "white",
    background: "red !important",
    "&:hover": {
      opacity: "0.7",
    },
    // marginBlock: "auto",
  },
  boxQuantity: {
    marginInline: "10px",
    display: "flex",
    paddingTop: "20px",
  },
}));

function AddToCartForm({ onSubmit = null }) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const schema = yup
    .object({
      quantity: yup
        .number()
        .min(1, "Minimun value is 1")
        .required("please enter quantity")
        .typeError("Quantity must be a number"),
    })
    .required();
  const classes = useStyles();
  const form = useForm({
    defaultValues: {
      quantity: 1,
    },
    resolver: yupResolver(schema),
  });
  const handleSubmit = async (values) => {
    if (onSubmit) await onSubmit(values);
    let notify = enqueueSnackbar(
      `Add ${values.quantity} Product Successfully !!! 🎉`,
      {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
          persist: true,
        },
      }
    );
    setTimeout(() => {
      closeSnackbar(notify);
    }, 700);
  };

  return (
    <>
      <form
        style={{
          borderLeft: "1px solid rgb(242 242 242)",
          paddingBottom: "15px",
        }}
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <Box className={classes.boxQuantity}>
          <NumberField name="quantity" form={form} label="Quantity" />
          <Box sx={{ marginTop: "10px" }}>
            <Button
              className={classes.button}
              variant="contained"
              type="submit"
            >
              ADD TO CART
            </Button>
          </Box>
        </Box>
      </form>
    </>
  );
}

export default AddToCartForm;

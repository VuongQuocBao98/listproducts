import React, { useState } from "react";
import PropTypes from "prop-types";

import {
  Typography,
  Box,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

FillterByPrice.propTypes = {
  onChange: PropTypes.func,
  fillters: PropTypes.object,
};
const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: "bold",
    textTransform: "uppercase",

    textAlign: "center",
    paddingTop: "15px",
  },
  box: {
    display: "flex",
    paddingInline: "2px",
    "& > span": {
      marginInline: "5px",
    },
    marginTop: "10px !important",
  },
  button: {
    marginInline: "auto !important",
    marginTop: "10px !important",
  },
}));

function FillterByPrice({ fillters = {}, onChange }) {
  const classes = useStyles();
  const [valuePrice, setValuePrice] = useState({
    salePrice_lte: 0,
    salePrice_gte: 0,
  });

  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    setValuePrice((prevValuePrice) => ({
      ...prevValuePrice,
      [name]: value,
    }));
  };
  const handleSubmit = () => {
    if (onChange) onChange(valuePrice);
    setValuePrice({
      salePrice_lte: 0,
      salePrice_gte: 0,
    });
  };
  return (
    <Box sx={{ borderTop: "#2979ff 1px solid" }}>
      <Typography
        className={classes.title}
        color="primary"
        variant="h5"
        component="h3"
      >
        Price
      </Typography>
      <Box className={classes.box}>
        <TextField
          name="salePrice_gte"
          variant="standard"
          color="primary"
          focused
          value={valuePrice.salePrice_gte}
          type="number"
          onChange={handleChangeValue}
          InputProps={{
            endAdornment: <InputAdornment position="start">đ</InputAdornment>,
          }}
        />
        <span> - </span>
        <TextField
          name="salePrice_lte"
          variant="standard"
          color="primary"
          focused
          type="number"
          value={valuePrice.salePrice_lte}
          onChange={handleChangeValue}
          InputProps={{
            endAdornment: <InputAdornment position="start">đ</InputAdornment>,
          }}
        />
      </Box>
      <Box className={classes.box}>
        <Button
          className={classes.button}
          variant="outlined"
          onClick={handleSubmit}
        >
          Apply
        </Button>
      </Box>
    </Box>
  );
}

export default FillterByPrice;

import React from "react";
import PropTypes from "prop-types";

import { Typography, Box, FormControlLabel, Checkbox } from "@mui/material";
import { makeStyles } from "@mui/styles";

FillterByService.propTypes = {
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
  ul: {
    paddingLeft: "15px !important",
  },
}));

function FillterByService({ fillters = {}, onChange }) {
  const classes = useStyles();

  const handleChecked = (e) => {
    if (!onChange) return;
    const { name, checked } = e.target;
    onChange({ [name]: checked });
  };

  return (
    <Box sx={{ borderTop: "#2979ff 1px solid", marginTop: "20px" }}>
      <Typography
        className={classes.title}
        color="primary"
        variant="h5"
        component="h3"
      >
        Services
      </Typography>
      <ul className={classes.ul}>
        {[
          {
            nameDisplay: "Promotion 📌",
            name: "isPromotion",
          },
          {
            nameDisplay: "FreeShip 🎁",
            name: "isFreeShip",
          },
        ].map((service) => (
          <FormControlLabel
            key={service.name}
            control={
              <Checkbox
                checked={fillters[service.name] ? true : false}
                onChange={handleChecked}
                name={service.name}
              />
            }
            label={`${service.nameDisplay}`}
          />
        ))}
      </ul>
    </Box>
  );
}

export default FillterByService;

import React from "react";
import PropTypes from "prop-types";
import productConstants from "../../../../constants/product";
import { Box } from "@mui/system";
import { makeStyles } from "@mui/styles";

ProductThumbnails.propTypes = {
  product: PropTypes.object,
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "20px",
    overflow: "hidden",
  },
  imgWrapper: {
    border: "8px groove #448aff",
    padding: "5px",
    maxWidth: "300px",
    borderRadius: "5px",
    position: "relative",
    cursor: "pointer",
    overflow: "hidden",
    margin: "auto",
    "&:hover > img": {
      transform: "scale(1.1)",
      transition: "all 1s",
    },
  },
  boxFreeShip: {
    position: "absolute",
    zIndex: "1",
    background: "rgb(26 148 255)",
    bottom: "0",
    left: "0",
    fontWeight: "bold",
    padding: "8px 5px 5px 5px",
    // borderRadius: "0px 35% 0px 0px",
    color: "white",
    borderTop: "5px solid red",
    borderRight: "5px solid red",
  },
}));

function ProductThumbnails({ product }) {
  const productThumbnailUrl = product.thumbnail
    ? `https://api.ezfrontend.com${product.thumbnail.url}`
    : `${productConstants.baseUrl}`;

  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.imgWrapper}>
        <img src={productThumbnailUrl} alt={product.name} width="100%" />
        <Box className={classes.boxFreeShip} component="div">
          Free Ship <span style={{ color: "red" }}>💯</span>{" "}
          <span style={{ color: "rgb(255 213 46)" }}>➕</span> Fast Ship{" "}
          <span style={{ color: "rgb(46 255 91)" }}>🚀</span>
        </Box>
      </Box>
    </Box>
  );
}

export default ProductThumbnails;

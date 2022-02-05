import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
ProductInfo.propTypes = {
  product: PropTypes.object,
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "10px",
    borderLeft: "1px solid rgb(242 242 242)",
  },
  productTitle: {
    fontSize: "24px !important",
    marginBottom: "8px !important",
  },
  boxRatting: {
    color: "rgb(120 120 120)",
    display: "flex",
    marginBottom: "8px !important",
  },

  boxPrice: {
    backgroundColor: "rgb(250 250 250)",
  },
  boxPromotion: {
    backgroundColor: "red",
    position: "absolute",
    padding: "5px",
    zIndex: "2",
    left: "0",
  },
}));

function ProductInfo({ product = {} }) {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography
        component="p"
        variant="span"
        sx={{ color: "rgb(13 92 182)", fontWeight: "300" }}
      >
        Top product hot in month ️🛒
      </Typography>
      <Typography className={classes.productTitle} component="h1" variant="h1">
        {product.name}
      </Typography>
      <Box className={classes.boxRatting}>
        <StarIcon sx={{ fontSize: "20px", color: "rgb(253 216 54)" }} />
        <StarIcon sx={{ fontSize: "20px", color: "rgb(253 216 54)" }} />
        <StarIcon sx={{ fontSize: "20px", color: "rgb(253 216 54)" }} />
        <StarIcon sx={{ fontSize: "20px", color: "rgb(253 216 54)" }} />
        <StarHalfIcon
          sx={{
            fontSize: "20px",
            color: "rgb(253 216 54)",
            marginRight: "8px",
          }}
        />
        <Typography variant="body1" sx={{ marginRight: "5px" }}>
          ( Ratting )
        </Typography>
        <Typography variant="body1" sx={{ marginRight: "5px" }}>
          {" "}
          |{" "}
        </Typography>
        <Typography variant="body1">( Sold 1000 +)</Typography>
      </Box>
      <Box className={classes.boxPrice}>
        <Box
          sx={{
            display: "flex",
            position: "relative",
            paddingInline: "16px",
          }}
        >
          {product.promotionPercent > 0 && (
            <Box className={classes.boxPromotion}>
              <div
                style={{
                  content: "",
                  width: "20px",
                  height: "15px",
                  position: "absolute",
                  background: "red",
                  transform: "rotate(45deg)",
                  right: "-8%",
                  top: "10%",
                  zIndex: "-1",
                  borderRadius: "20px 0px 20px 20px",
                }}
              ></div>
              <Typography
                component="div"
                sx={{
                  fontWeight: "500",
                  fontSize: "10px",
                  color: "white",
                  zIndex: "2",
                }}
              >
                Sale {product.promotionPercent}%
              </Typography>
            </Box>
          )}
          <Typography
            component="div"
            sx={{
              fontWeight: "500",
              fontSize: "32px",
              marginRight: "10px",
              marginLeft: product.promotionPercent > 0 ? "40px" : "0px",
            }}
          >
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(product.salePrice)}
          </Typography>
          <Typography
            component="div"
            sx={{
              fontWeight: "300",
              fontSize: "20px",
              color: "red",
              textDecoration: "line-through",
              marginTop: "12px",
            }}
          >
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(product.originalPrice)}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ marginTop: "15px", marginBottom: "15px" }}>
        <Typography component="div" variant="body2">
          {product.shortDescription}
        </Typography>
      </Box>
      <Box sx={{ borderTop: "1px solid rgb(242 242 242)" }}> </Box>
    </Box>
  );
}

export default ProductInfo;

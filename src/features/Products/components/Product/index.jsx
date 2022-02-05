import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import productConstants from "../../../../constants/product";
import { useHistory } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
const useStyles = makeStyles((theme) => ({
  root: {
    "&:hover": {
      cursor: "pointer",
      boxShadow: "-30px 30px 100px rgba(0,0,0,0.2)",
      transition: "1s ease",
      borderRadius: "5px",
    },
  },
  boxRatting: {
    color: "rgb(120 120 120)",
    display: "flex",
    marginBottom: "8px !important",
  },
}));
Product.propTypes = {
  product: PropTypes.object.isRequired,
};
Product.defaultProps = {
  product: {},
};

function Product({ product }) {
  const productThumbnailUrl = product.thumbnail
    ? `https://api.ezfrontend.com${product.thumbnail.url}`
    : `${productConstants.baseUrl}`;

  const classes = useStyles();
  const history = useHistory();
  const handleClickProductDetail = () => {
    history.push(`products/${product.id}`);
  };

  return (
    <Box padding={1}>
      <Box
        padding={1}
        className={classes.root}
        onClick={handleClickProductDetail}
      >
        <img width="100%" src={productThumbnailUrl} alt={product.name} />
        <Typography
          component="p"
          sx={{ textTransform: "uppercase", fontWeight: "bold" }}
          variant="body2"
          className={classes.title}
        >
          {product.name}
        </Typography>
        <Box className={classes.boxRatting}>
          <StarIcon sx={{ fontSize: "15px", color: "rgb(253 216 54)" }} />
          <StarIcon sx={{ fontSize: "15px", color: "rgb(253 216 54)" }} />
          <StarIcon sx={{ fontSize: "15px", color: "rgb(253 216 54)" }} />
          <StarIcon sx={{ fontSize: "15px", color: "rgb(253 216 54)" }} />
          <StarHalfIcon
            sx={{
              fontSize: "15px",
              color: "rgb(253 216 54)",
              marginRight: "8px",
            }}
          />
        </Box>
        <Typography component="div" variant="body2">
          <Typography sx={{ fontWeight: "bold" }} component="span">
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(product.salePrice)}
          </Typography>
          {product.promotionPercent > 0 && (
            <>
              <Typography
                sx={{
                  fontSize: "12px",
                  color: "red",
                  border: "1px solid red",
                  borderRadius: "5px",
                  marginLeft: "10px",
                  background: "rgb(255 234 224)",
                }}
                component="span"
              >
                {product.promotionPercent > 0
                  ? ` -${product.promotionPercent}%`
                  : ""}
              </Typography>
              <Box>
                <Typography
                  component="div"
                  sx={{ fontWeight: "bold", color: "red", fontSize: "12px" }}
                >
                  💰 RẺ HƠN HOÀN TIỀN
                </Typography>
              </Box>
            </>
          )}
        </Typography>
      </Box>
    </Box>
  );
}

export default Product;

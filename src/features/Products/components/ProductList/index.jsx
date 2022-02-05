import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import Product from "../Product";

ProductList.propTypes = {
  data: PropTypes.array,
};
ProductList.defaultProps = {
  data: [],
};
function ProductList({ data }) {
  return (
    <Box>
      <Grid container>
        {data.map((product) => {
          return (
            <Grid item key={product.id} xs={6} sm={4} md={3} lg={3}>
              <Product product={product} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

export default ProductList;

import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/system";
import FillterByCategory from "./Fillters/FillterByCategory";
import FillterByPrice from "./Fillters/FillterByPrice";
import FillterByService from "./Fillters/FillterByService";

ProductFillters.propTypes = {
  fillters: PropTypes.object.isRequired,
  onChange: PropTypes.func,
};

function ProductFillters({ fillters, onChange }) {
  const handleCategoryChange = (newCategoryId, NewCategoryName) => {
    const newFillters = {
      "category.id": newCategoryId,
      "category.name": NewCategoryName,
    };
    if (onChange) onChange(newFillters);
  };
  const handlePriceChange = (newPriceFillter) => {
    if (
      newPriceFillter.salePrice_gte === 0 &&
      newPriceFillter.salePrice_lte === 0
    ) {
      delete fillters.salePrice_gte;
      delete fillters.salePrice_lte;
      if (onChange) onChange(fillters);
    } else {
      if (onChange) onChange(newPriceFillter);
    }
  };
  const handleServiceChange = (newServiceFillter) => {
    if (onChange) onChange(newServiceFillter);
  };
  return (
    <Box>
      <FillterByCategory onChange={handleCategoryChange} />
      <FillterByPrice fillters={fillters} onChange={handlePriceChange} />
      <FillterByService fillters={fillters} onChange={handleServiceChange} />
    </Box>
  );
}

export default ProductFillters;

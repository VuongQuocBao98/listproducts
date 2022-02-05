import React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

ProductSort.propTypes = {
  currentSort: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};
ProductSort.defaultProps = {};

function ProductSort({ currentSort, onChange }) {
  const handleSortChange = (e, value) => {
    if (onChange) onChange(value);
  };
  return (
    <Tabs
      textColor="primary"
      indicatorColor="primary"
      onChange={handleSortChange}
      value={currentSort}
    >
      <Tab
        sx={{ marginLeft: "20px", fontWeight: "bold", textTransform: "none" }}
        label="Price ↥"
        value="salePrice:ASC"
      />
      <Tab
        sx={{ fontWeight: "bold", textTransform: "none" }}
        label="Price ↧"
        value="salePrice:DESC"
      />
    </Tabs>
  );
}

export default ProductSort;

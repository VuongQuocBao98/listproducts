import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/system";
import { Paper } from "@mui/material";
import DOMPurify from "dompurify";

DetailPageDescription.propTypes = {
  product: PropTypes.object,
};

function DetailPageDescription({ product = {} }) {
  const safeDescription = DOMPurify.sanitize(product.description);
  return (
    <Box>
      <Paper elevation={0} square sx={{ borderRadius: "5px" }}>
        <Box sx={{ margin: "10px" }}>
          <div dangerouslySetInnerHTML={{ __html: safeDescription }}></div>
        </Box>
      </Paper>
    </Box>
  );
}

export default DetailPageDescription;

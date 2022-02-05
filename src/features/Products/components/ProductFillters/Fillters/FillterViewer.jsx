import React, { useMemo } from "react";
import PropTypes from "prop-types";

import { Box, Chip } from "@mui/material";
import { makeStyles } from "@mui/styles";

FillterViewer.propTypes = {
  onChange: PropTypes.func,
  fillters: PropTypes.object,
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexFlow: "row wrap",
    alignItems: "center",
    listStyle: "none",
    "& > li": {
      marginRight: "5px",
    },
  },
}));

const FILTERlIST = [
  {
    id: 1,
    getLabel: () => "Free Ship 🎁",
    isActive: (fillters) => fillters.isFreeShip,
    isVisible: () => true,
    isRemovable: false,
    onRemove: () => {},
    onToggle: (fillters) => {
      const newFilters = { ...fillters };
      newFilters._page = 1;
      if (newFilters.isFreeShip) {
        delete newFilters.isFreeShip;
      } else {
        newFilters.isFreeShip = true;
      }
      return newFilters;
    },
  },
  {
    id: 2,
    getLabel: () => "Promotion 📌",
    isActive: (fillters) => fillters.isPromotion,
    isVisible: (fillters) => fillters.isPromotion,
    isRemovable: true,
    onRemove: (fillters) => {
      const newFilters = { ...fillters };
      if (newFilters.isPromotion) {
        delete newFilters.isPromotion;
      }

      return newFilters;
    },
    onToggle: () => {},
  },
  {
    id: 3,
    getLabel: (fillters) => {
      let gte = fillters.salePrice_gte.toString();
      let lte = fillters.salePrice_lte.toString();
      return `${gte} đ - ${lte} đ`;
    },
    isActive: (fillters) => fillters.salePrice_gte || fillters.salePrice_lte,
    isVisible: (fillters) => fillters.salePrice_gte || fillters.salePrice_lte,
    isRemovable: true,
    onRemove: (fillters) => {
      const newFilters = { ...fillters };
      delete newFilters.salePrice_gte;
      delete newFilters.salePrice_lte;
      return newFilters;
    },
    onToggle: () => {},
  },
  {
    id: 4,
    getLabel: (fillters) => fillters["category.name"],
    isActive: () => true,
    isVisible: (fillters) => fillters["category.id"],
    isRemovable: true,
    onRemove: (fillters) => {
      const newFilters = { ...fillters };
      delete newFilters["category.id"];
      delete newFilters["category.name"];

      return newFilters;
    },
    onToggle: () => {},
  },
];

function FillterViewer({ fillters = {}, onChange = null }) {
  const classes = useStyles();

  const visibleFilter = useMemo(() => {
    return FILTERlIST.filter((x) => x.isVisible(fillters));
  }, [fillters]);

  return (
    <Box component="ul" className={classes.root}>
      {visibleFilter.map((x) => (
        <li key={x.id}>
          <Chip
            label={x.getLabel(fillters)}
            color={x.isActive(fillters) ? "primary" : "default"}
            clickable={!x.isRemovable}
            onClick={
              x.isRemovable
                ? null
                : () => {
                    if (!onChange) return;
                    const newFilters = x.onToggle(fillters);
                    onChange(newFilters);
                  }
            }
            onDelete={
              x.isRemovable
                ? () => {
                    if (!onChange) return;
                    const newFillters = x.onRemove(fillters);
                    onChange(newFillters);
                  }
                : null
            }
          />
        </li>
      ))}
    </Box>
  );
}

export default FillterViewer;

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/system";
import { Typography, Skeleton } from "@mui/material";
import categoryApi from "../../../../../api/categoryApi";
import { makeStyles } from "@mui/styles";

FillterByCategory.propTypes = {
  onChange: PropTypes.func,
};
const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: "bold",
    textTransform: "uppercase",

    textAlign: "center",
    paddingTop: "15px",
  },
  ul: {
    listStyle: "none",
  },
  li: {
    cursor: "pointer",
    marginBottom: "5px",
    "&:hover": {
      color: "#2979ff",
      fontWeight: "bold",
      transition: "all 0.5s ease",
    },
  },
}));

function FillterByCategory({ onChange }) {
  const classes = useStyles();
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await categoryApi.getAll();

        setCategoryList(
          response.map((x) => ({
            id: x.id,
            name: x.name,
          }))
        );
        setLoading(true);
      } catch (error) {
        setLoading(true);
        console.log(error);
      }
    };
    fetch();
  }, []);
  const handleClickCategory = (categoryId, categoryName) => {
    if (onChange) {
      onChange(categoryId, categoryName);
    }
  };

  return (
    <>
      {loading === false ? (
        <Box padding={2}>
          <Skeleton variant="text" width="85%" />
          <Skeleton variant="text" width="70%" />
          <Skeleton variant="text" width="83%" />
          <Skeleton variant="text" width="90%" />
          <Skeleton variant="text" width="80%" />
          <Skeleton variant="text" width="75%" />
          <Skeleton variant="text" width="70%" />
          <Skeleton variant="text" width="95%" />
          <Skeleton variant="text" width="88%" />
          <Skeleton variant="text" width="67%" />
        </Box>
      ) : (
        <Box>
          <Typography
            color="primary"
            className={classes.title}
            variant="h5"
            component="h3"
          >
            Categorys
          </Typography>
          <ul className={classes.ul}>
            {categoryList.map((category) => {
              return (
                <li
                  key={category.id}
                  onClick={() =>
                    handleClickCategory(category.id, category.name)
                  }
                  className={classes.li}
                >
                  {category.name}
                </li>
              );
            })}
          </ul>
        </Box>
      )}
    </>
  );
}

export default FillterByCategory;

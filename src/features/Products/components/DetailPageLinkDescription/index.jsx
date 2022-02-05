import React from "react";

import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { Link } from "@mui/material";
import { NavLink, useRouteMatch } from "react-router-dom";

DetailPageLinkDescription.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: {
    "& > ul": {
      listStyle: "none",
      display: "flex",
      textAlign: "center",
      justifyContent: "center",
    },
    "& > ul li": {
      marginRight: "10px",
      textDecoration: "none",
      fontWeight: "bold",
    },
    "& > ul li:hover a": {
      color: "#3f51b5",
      transition: "all 0.2s ease",
    },
    "& ul li a": {
      textDecoration: "none",
    },
    "& ul li a.active": {
      textDecoration: "underline",
    },
  },
}));
function DetailPageLinkDescription(props) {
  const classes = useStyles();
  const match = useRouteMatch();

  return (
    <Box className={classes.root}>
      <ul>
        <li>
          <Link component={NavLink} to={match.url} exact>
            Description
          </Link>
        </li>
        <li>
          <Link component={NavLink} to={`${match.url}/additional`} exact>
            Additional
          </Link>
        </li>
        <li>
          <Link component={NavLink} to={`${match.url}/review`} exact>
            Review
          </Link>
        </li>
      </ul>
    </Box>
  );
}

export default DetailPageLinkDescription;

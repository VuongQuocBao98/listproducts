import React from "react";

import { Route, Switch, useRouteMatch } from "react-router-dom";
import ListPage from "./pages/ListPage";
import { Box } from "@mui/system";
import { makeStyles } from "@mui/styles";
import DetailPage from "./pages/DetailPage";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

ProductFeature.propTypes = {};

function ProductFeature(props) {
  const classes = useStyles();
  const match = useRouteMatch();

  return (
    <Box className={classes.root}>
      <Switch>
        <Route path={match.url} exact component={ListPage} />
        {/* <Route path={match.url} exact component={ListPage} /> */}
        <Route path={`${match.url}/:productId`} component={DetailPage} />
      </Switch>
    </Box>
  );
}

export default ProductFeature;

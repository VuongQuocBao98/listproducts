import React from "react";

import { Box } from "@mui/system";
import { Switch, Route } from "react-router-dom";
import { Container, Grid, Paper, Skeleton } from "@mui/material";
import { useRouteMatch } from "react-router-dom";
import useProductDetail from "../../hooks/useProductDetail";
import ProductThumbnails from "../../components/ProductThumbnails";
import ProductInfo from "../../components/ProductInfo";
import AddToCartForm from "../../components/AddToCartForm";
import DetailPageLinkDescription from "../../components/DetailPageLinkDescription";
import DetailPageDescription from "../../components/DetailPageDescription";
import DetailPageReview from "../../components/DetailPageReview";
import DetailPageAdditional from "../../components/DetailPageAdditional";

import { useDispatch } from "react-redux";
import { addToCart } from "../../../Cart/cartSlice";

DetailPage.propTypes = {};

function DetailPage(props) {
  const match = useRouteMatch();
  const { product, loading } = useProductDetail(match.params.productId);

  const dispatch = useDispatch();
  if (loading) {
    return (
      <Box>
        <Container>
          <Paper elevation={0} square sx={{ borderRadius: "5px" }}>
            <Grid container>
              <Grid xs={12} sm={12} md={4} item>
                <Box padding={1}>
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    sx={{ textAlign: "center" }}
                    height={250}
                  />
                </Box>
              </Grid>
              <Grid xs={12} sm={12} md={8} item>
                <Box padding={1}>
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    sx={{ textAlign: "center" }}
                    height={320}
                  />
                </Box>
              </Grid>
              <Grid xs={12} sm={12} md={12} item>
                <Box padding={1}>
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    sx={{ textAlign: "center" }}
                    height={200}
                  />
                </Box>
              </Grid>
            </Grid>
          </Paper>

          <Paper>
            <Skeleton
              variant="rectangular"
              width="100%"
              sx={{ textAlign: "center" }}
              height={400}
            />
          </Paper>
        </Container>
      </Box>
    );
  }

  const handleAddToCartForm = (formValues) => {
    // console.log("form values", formValues);
    const data = {
      id: product.id,
      quantity: formValues.quantity,
      product: product,
    };
    const action = addToCart(data);
    dispatch(action);
  };

  return (
    <Box>
      <Container>
        <Paper elevation={0} square sx={{ borderRadius: "5px" }}>
          <Grid container>
            <Grid xs={12} sm={12} md={4} item>
              <ProductThumbnails product={product} />
            </Grid>
            <Grid xs={12} sm={12} md={8} item>
              <ProductInfo product={product} />
              <AddToCartForm onSubmit={handleAddToCartForm} />
            </Grid>
          </Grid>
        </Paper>

        <DetailPageLinkDescription />
        <Switch>
          <Route path={`${match.url}`} exact>
            <DetailPageDescription product={product} />
          </Route>
          <Route
            path={`${match.url}/review`}
            exact
            component={DetailPageReview}
          />
          <Route
            path={`${match.url}/additional`}
            exact
            component={DetailPageAdditional}
          />
        </Switch>
      </Container>
    </Box>
  );
}

export default DetailPage;

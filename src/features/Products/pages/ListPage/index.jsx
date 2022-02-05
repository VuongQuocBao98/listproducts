import React, { useEffect, useMemo, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import queryString from "query-string";
import { Box } from "@mui/system";
import { Container, Grid, Pagination, Paper, Typography } from "@mui/material";
import productAPi from "../../../../api/productApi.js";
import ProductSkeletonList from "../../components/ProductSkeletonList/index.jsx";
import ProductList from "../../components/ProductList/index.jsx";
import ProductSort from "../../components/ProductSort/index.jsx";
import ProductFillters from "../../components/ProductFillters/index.jsx";
import FillterViewer from "../../components/ProductFillters/Fillters/FillterViewer.jsx";

function ListPage(props) {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [numberSkeleton, setNumberSkeleton] = useState(8);

  //get search for fillters from url
  const location = useLocation();
  // parse search params from location search
  // const [fillters, setFillters] = useState({
  //   _page: 1,
  //   _limit: 12,
  //   _sort: "salePrice:ASC",
  // });
  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);

    const query = {
      ...params,
      _page: Number.parseInt(params._page) || 1,
      _limit: Number.parseInt(params._limit) || 12,
      _sort: params._sort || "salePrice:ASC",
    };
    if (query.isPromotion === "false") {
      delete query.isPromotion;
    }
    if (query.isFreeShip === "false") {
      delete query.isFreeShip;
    }
    return query;
  }, [location.search]);

  // const [fillters, setFillters] = useState(() => ({
  //   ...queryParams,
  //   _page: Number.parseInt(queryParams._page) || 1,
  //   _limit: Number.parseInt(queryParams._limit) || 12,
  //   _sort: queryParams._sort || "salePrice:ASC",
  // }));

  const [pagination, setPagination] = useState({
    page: 1,
    total: 10,
    limit: 12,
  });
  const history = useHistory();

  // Push query params on url
  useEffect(() => {
    if (queryParams.isPromotion === false) {
      delete queryParams.isPromotion;
    }
    if (queryParams.isFreeShip === false) {
      delete queryParams.isFreeShip;
    }
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(queryParams),
    });
  }, [history, queryParams]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productAPi.getAll(queryParams);
        const data = response.data;

        const pagination = response.pagination;
        setPagination(pagination);
        setNumberSkeleton(data.lenght);
        setProductList(data);
      } catch (error) {
        console.log("failed to fetch productList: ", error);
      }
      setLoading(false);
    };
    fetchProduct();
  }, [queryParams]);

  const handleChangePage = (e, page) => {
    // setFillters((prevFillters) => ({
    //   ...prevFillters,
    //   _page: page,
    // }));
    const filters = {
      ...queryParams,
      _page: page,
    };
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };
  const handleSortPage = (value) => {
    // setFillters((prevFillters) => ({
    //   ...prevFillters,
    //   _sort: value,
    // }));
    const filters = {
      ...queryParams,
      _sort: value,
      _page: 1,
    };
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };

  const handleFillterPage = (value) => {
    // setFillters((prevFillters) => ({
    //   ...prevFillters,
    //   ...value,
    // }));
    const filters = {
      ...queryParams,
      ...value,
      _page: 1,
    };
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };
  const handleFillterViewer = (newFillters) => {
    // setFillters(newFillters);
    const filters = newFillters;
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };

  return (
    <Box>
      <Container>
        <Paper elevation={0} square sx={{ borderRadius: "5px" }}>
          <Grid container>
            <Grid sm={2} md={2} item>
              <ProductFillters
                fillters={queryParams}
                onChange={handleFillterPage}
              />
            </Grid>
            <Grid xs={12} sm={10} md={10} item>
              <Grid container>
                <Grid item xs={12}>
                  <ProductSort
                    currentSort={queryParams._sort}
                    onChange={handleSortPage}
                  />
                  <FillterViewer
                    fillters={queryParams}
                    onChange={handleFillterViewer}
                  />
                </Grid>
              </Grid>

              {loading ? (
                <ProductSkeletonList length={numberSkeleton} />
              ) : (
                <>
                  <ProductList data={productList} />
                  {productList.length > 0 ? (
                    <Pagination
                      count={
                        pagination.total
                          ? Math.ceil(pagination.total / pagination.limit)
                          : 10
                      }
                      page={pagination.page}
                      color="primary"
                      variant="outlined"
                      shape="rounded"
                      sx={{
                        justifyContent: "center",
                        paddingBottom: "20px",
                        paddingTop: "10px",
                        display: "flex",
                      }}
                      onChange={handleChangePage}
                    />
                  ) : (
                    <Typography
                      component="h2"
                      variant="h2"
                      sx={{
                        padding: "20px",
                        color: "#448aff",
                        fontWeight: "bold",
                      }}
                    >
                      {" "}
                      No Product... 😥
                    </Typography>
                  )}
                </>
              )}
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}

export default ListPage;

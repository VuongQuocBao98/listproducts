import React, { useEffect, useState } from "react";

import { Box } from "@mui/system";
import {
  Button,
  Checkbox,
  Container,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import { makeStyles } from "@mui/styles";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import productConstants from "../../constants/product";
import DeleteIcon from "@mui/icons-material/Delete";
import { removeCartItem } from "./cartSlice";
import { Link } from "react-router-dom";
import { cartItemsCount } from "./cartSelecter";
import { useSnackbar } from "notistack";
const useStyles = makeStyles((theme) => ({
  boxCovidNotify: {
    border: "1px solid rgb(27 168 255)",
    padding: "20px 10px",
    borderRadius: "5px",
    backgroundColor: "rgb(232 246 255)",
    display: "flex",
  },
  notify: {
    color: "rgb(13 92 182) !important",
  },
  boxTable: {
    display: "flex",
    alignItems: "center",
  },
}));
function CartFeature(props) {
  const classes = useStyles();
  const orders = useSelector((state) => state.cart.cartItems);
  const [checkList, setCheckList] = useState([]);
  const [total, setTotal] = useState(0);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  // console.log(orders);

  // GET USER INFO FROM REDUX
  const user = useSelector((state) => state.user.curentUser);

  //set checked list
  const handleChecked = (e) => {
    let number = Number.parseInt(e.target.value);
    let data = {};
    orders.forEach((el) => {
      if (el.id === number) {
        data.id = number;
        data.price = el.product.salePrice;
        data.quantity = el.quantity;
      }
    });

    if (e.target.checked === true) {
      // checkList.push(e.target.value);
      let temp = [...checkList];
      temp.push(data);
      setCheckList(temp);
    } else {
      let temp = [...checkList];
      for (let i = 0; i <= temp.length; i++) {
        if (temp[i].id === data.id) {
          temp.splice(i, 1);
        }
      }
      setCheckList(temp);
    }
  };
  useEffect(() => {
    let quantity = 0;
    let total = 0;
    checkList.forEach((el) => {
      quantity = el.price * el.quantity;
      total += quantity;
    });

    setTotal(total);
  }, [checkList]);
  // DELETE INTEM WHEN CLICK DELETE BUTTOM
  const handleDeleteItems = (id) => {
    let temp = [...checkList];
    if (temp.length > 0) {
      for (let i = 0; i <= temp.length; i++) {
        if (temp[i]) {
          if (temp[i].id === id) {
            temp.splice(i, 1);
          }
        }
      }

      setCheckList(temp);
    }
    const action = removeCartItem(id);
    dispatch(action);

    let notify = enqueueSnackbar(`Delete Successfully`, {
      variant: "warning",
      anchorOrigin: {
        vertical: "top",
        horizontal: "center",
        persist: true,
      },
    });
    setTimeout(() => {
      closeSnackbar(notify);
    }, 700);
  };
  const cartQuantity = useSelector(cartItemsCount);

  return (
    <Box>
      <Container>
        {/* NOTIFY COVID SENCE */}
        <Box className={classes.boxCovidNotify}>
          <NotificationsNoneIcon className={classes.notify} />
          <Typography
            component="div"
            variant="body1"
            sx={{ color: "rgb(13 92 182)", fontSize: "13px" }}
          >
            Do ảnh hưởng của dịch Covid-19, một số khu vực có thể nhận hàng chậm
            hơn dự kiến. Tiki đang nỗ lực giao các đơn hàng trong thời gian sớm
            nhất. Cám ơn sự thông cảm của quý khách!
          </Typography>
        </Box>
        {/* CHECK CART EMPTY  */}
        {cartQuantity > 0 ? (
          <Box sx={{ marginBlock: "10px" }}>
            <Grid container>
              <Grid xs={12} item sm={8} md={8}>
                <Paper
                  sx={{ padding: "10px", borderRadius: "5px 0px 0px 5px" }}
                >
                  {/* TABLE INFO CART  */}
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Choose</TableCell>
                        <TableCell align="center">Image</TableCell>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">Price</TableCell>
                        <TableCell align="center">Quantity</TableCell>
                        <TableCell align="center">Total</TableCell>
                        <TableCell align="center">Delete</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {orders.map((data) => (
                        <TableRow key={data.id}>
                          <TableCell>
                            <Checkbox
                              onChange={handleChecked}
                              value={data.id}
                              margin="none"
                            />
                          </TableCell>
                          <TableCell align="center">
                            {" "}
                            <img
                              src={
                                data.product.thumbnail === null
                                  ? productConstants.baseUrl
                                  : `https://api.ezfrontend.com${data.product.thumbnail.url}`
                              }
                              width={80}
                              alt={data.product.name}
                            />
                          </TableCell>

                          <TableCell align="center">
                            <Link
                              style={{
                                textDecoration: "none",
                                color: "blue",
                              }}
                              to={`products/${data.id}`}
                            >
                              {data.product.name}
                            </Link>
                          </TableCell>
                          <TableCell align="center">
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(data.product.salePrice)}
                          </TableCell>
                          <TableCell align="center">{data.quantity}</TableCell>
                          <TableCell align="center">
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(data.quantity * data.product.salePrice)}
                          </TableCell>
                          <TableCell align="center">
                            <IconButton
                              value={data.id}
                              onClick={() => handleDeleteItems(data.id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Paper>
              </Grid>

              {/* INFO CUSTOMER  */}
              <Grid xs={12} item sm={4} md={4}>
                <Paper
                  sx={{ padding: "10px", borderRadius: "0px 5px 5px 0px" }}
                >
                  <Box sx={{ borderBottom: "1px solid grey" }}>
                    <Typography>
                      Item Selected{" "}
                      <span style={{ fontWeight: "bold", color: "blue" }}>
                        {" "}
                        {checkList.length > 0 ? checkList.length : 0}
                      </span>
                    </Typography>
                    <Typography>
                      Total:{" "}
                      <span style={{ fontWeight: "bold", color: "blue" }}>
                        {" "}
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(total)}
                      </span>
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      marginTop: "10px",
                      paddingBottom: "10px",
                      borderBottom: "1px solid grey",
                    }}
                  >
                    {user.email ? (
                      <>
                        <Typography>Name: {user.username}</Typography>
                        <Typography>Email: {user.email}</Typography>
                      </>
                    ) : (
                      <>
                        <Typography>Name:</Typography>
                        <input />
                        <Typography>Email:</Typography>
                        <input />
                      </>
                    )}
                    <Typography>Phone:</Typography>
                    <input />
                    <Typography>Address:</Typography>
                    <textarea />
                  </Box>
                  <Box sx={{ marginTop: "10px" }}>
                    <Button color="primary" variant="contained">
                      CheckOut
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        ) : (
          <Box
            sx={{
              marginBlock: "10px",
            }}
          >
            <Grid container>
              <Grid xs={12} item>
                <img
                  src="https://i.imgur.com/na5Z9f8.png"
                  alt="empty"
                  width="100%"
                />
              </Grid>
            </Grid>
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default CartFeature;

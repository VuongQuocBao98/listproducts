import {
  AppBar,
  Badge,
  Button,
  CssBaseline,
  Dialog,
  DialogContent,
  Fab,
  IconButton,
  MenuItem,
  Slide,
  Toolbar,
  Typography,
  useScrollTrigger,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { makeStyles } from "@mui/styles";
import MenuIcon from "@mui/icons-material/Menu";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import ScrollTop from "./ScrollTop";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import CloseIcon from "@mui/icons-material/Close";
import { Link, NavLink } from "react-router-dom";

import Register from "../../features/Auth/components/Register";
import Login from "../../features/Auth/components/Login";
import formStatus from "../../constants/common";

import { useDispatch, useSelector } from "react-redux";
import "./styles.css";
import { logout } from "../../features/Auth/userSlice";
import { cartItemsCount } from "../../features/Cart/cartSelecter";

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
    color: "#fff",
  },
  dialogContent: {
    paddingTop: "10px !important",
  },
  iconClose: {
    color: "#9e9e9e",
    cursor: "pointer",
    display: "block !important",
    marginLeft: "auto !important",
    marginTop: "0px",
  },
  statusAuth: {
    textDecoration: "underline",
    color: "#1976d2",
    cursor: "pointer",
    marginTop: "10px !important",
    textAlign: "center",
  },
}));

function Header(props) {
  const classes = useStyles();
  const loggedUser = useSelector((state) => state.user.curentUser);
  const isLoggin = !!loggedUser.id;

  const [open, setOpen] = useState(false);
  const [statusAuth, setStatusAuth] = useState(formStatus.REGISTER);
  const [anchor, setAnchor] = useState(false);
  const dispatch = useDispatch();

  //Open Menu
  //close menu
  const handleClickMenu = () => {
    setAnchor(!anchor);
  };
  let menuRef = useRef();
  //Close menu when cick mouse down
  useEffect(() => {
    const handler = (event) => {
      if (menuRef.current) {
        if (menuRef.current.contains(event.target) === false) setAnchor(false);
      }
    };
    window.addEventListener("mousedown", handler);
    return () => {
      window.removeEventListener("mousedown", handler);
    };
  });

  //OPEN DIALOG
  const handleClickOpen = () => {
    setOpen(true);
  };
  //CLOSE DIALOG
  const handleClose = () => {
    setOpen(false);
  };

  //HIDE APPBAR WHILE SCROLL
  function HideOnScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
      target: window ? window() : undefined,
    });

    return (
      <Slide appear={false} direction="down" in={!trigger}>
        {children}
      </Slide>
    );
  }
  HideOnScroll.propTypes = {
    children: PropTypes.element.isRequired,

    window: PropTypes.func,
  };

  // HANDLE LOGOUT
  const handleLogout = () => {
    const action = logout();
    dispatch(action);
  };

  const cartQuantity = useSelector(cartItemsCount);

  return (
    <header>
      <CssBaseline />

      <HideOnScroll {...props}>
        <AppBar>
          <Toolbar>
            <IconButton edge="start" color="inherit" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h5"
              component="div"
              sx={{ flexGrow: "1", fontWeight: "bold" }}
            >
              <Button sx={{ fontWeight: "bold" }} color="inherit">
                <Link className={classes.link} to="/">
                  My Store
                </Link>
              </Button>
            </Typography>
            <NavLink className={classes.link} to="/cart">
              <IconButton color="inherit">
                <Badge badgeContent={cartQuantity} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </NavLink>

            {!isLoggin ? (
              <Button
                color="inherit"
                sx={{ textTransform: "none" }}
                onClick={handleClickOpen}
              >
                <Typography
                  sx={{ textTransform: "none", mr: 1 }}
                  component="div"
                >
                  Login
                </Typography>
                <AccountCircleSharpIcon />
              </Button>
            ) : (
              <>
                <Button
                  color="inherit"
                  sx={{ textTransform: "none" }}
                  onClick={handleClickMenu}
                  className="buttonMenu"
                >
                  <Typography
                    sx={{ textTransform: "none", mr: 1 }}
                    component="div"
                  >
                    {loggedUser.fullName}
                  </Typography>
                  <AccountCircleSharpIcon />
                  {anchor === false ? (
                    <></>
                  ) : (
                    <div ref={menuRef} className="menu">
                      <MenuItem>My account</MenuItem>
                      <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </div>
                  )}
                </Button>
              </>
            )}

            <Dialog open={open} disableEscapeKeyDown maxWidth="xs">
              <DialogContent className={classes.dialogContent}>
                <CloseIcon
                  className={classes.iconClose}
                  onClick={handleClose}
                />
                {statusAuth === formStatus.REGISTER ? (
                  <>
                    <Register closeDialog={handleClose} />
                    <Typography
                      onClick={() => setStatusAuth(formStatus.LOGIN)}
                      component="div"
                      className={classes.statusAuth}
                    >
                      Allready have an account, login here !!!
                    </Typography>
                  </>
                ) : (
                  <>
                    <Login closeDialog={handleClose} />
                    <Typography
                      onClick={() => setStatusAuth(formStatus.REGISTER)}
                      component="div"
                      className={classes.statusAuth}
                    >
                      Don't have an account, register here !!!
                    </Typography>
                  </>
                )}
              </DialogContent>
            </Dialog>
          </Toolbar>
        </AppBar>
      </HideOnScroll>

      {/* BACK TO TOP BUTTON  */}
      <Toolbar id="back-to-top-anchor" />
      <ScrollTop {...props}>
        <Fab color="inherit" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </header>
  );
}

export default Header;

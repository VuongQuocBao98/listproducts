import { Toolbar } from "@mui/material";

import { Route, Switch, Redirect } from "react-router-dom";

import Footer from "./components/Footer";
import Header from "./components/Header";

import NotFound from "./components/NotFound";
import CartFeature from "./features/Cart";
import Example from "./features/example";
import ProductFeature from "./features/Products";

function App() {
  return (
    <>
      <Header />

      <Toolbar style={{ minHeight: "10px" }} />

      <Switch>
        <Redirect to="/products" from="/" exact />
        <Route exact path="/album" component={Example} />
        <Route path="/products" component={ProductFeature} />
        <Route path="/cart" exact component={CartFeature} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;

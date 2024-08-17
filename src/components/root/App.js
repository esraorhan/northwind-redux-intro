import React from "react";
import { Container } from "reactstrap";
import Navi from "../navi/Navi";
import Dashboard from "./Dashboard";
import { Route, Routes } from "react-router-dom";
import CartDetail from "../cart/CartDetail";
import AddOrUpdateProduct from "../products/AddOrUpdateProduct";
import NotFound from "../common/NotFound";
function App() {
  return (
    <div className="App">
    <Container>
      <Navi/>
      <Routes> 
      {/* <Dashboard/> */}
      <Route path="/" exact Component={Dashboard} />
      <Route path="/product" exact Component={Dashboard} />
      <Route path="/cart" exact Component={CartDetail} />
      <Route path="/saveproduct/:productId" exact Component={AddOrUpdateProduct} />
      <Route path="/saveproduct" exact Component={AddOrUpdateProduct} />
      <Route   Component={NotFound} />
      </Routes>
    </Container>
    </div>
  );
}

export default App;

import React from "react";
import { Container } from "reactstrap";
import Navi from "../navi/Navi";
import Dashboard from "./Dashboard";

function App() {
  return (
    <div className="App">
    <Container>
      <Navi/>
      <Dashboard/>
    </Container>
    </div>
  );
}

export default App;

import { Route } from "react-router-dom";
import { Fragment } from "react";
import Home from "./components/Home/Home";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Vehicles from "./components/Vehicles/Vehicles";

function App() {
  return (
    <Fragment>
      <Navbar></Navbar>
      <Route exact path="/" component={Home} />
      <Route path="/vehicles" component={Vehicles} />
      <Footer></Footer>
    </Fragment>
  );
}

export default App;

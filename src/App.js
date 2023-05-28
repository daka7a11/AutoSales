import { Route } from "react-router-dom";
import { Fragment } from "react";
import Home from "./components/Home/Home";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Fragment>
      <Navbar></Navbar>
      <Route path="/" component={Home} />
      <Footer></Footer>
    </Fragment>
  );
}

export default App;

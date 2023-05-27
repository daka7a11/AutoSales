import { Route } from "react-router-dom";
import { Fragment } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
import styles from "./App.module.css";

function App() {
  return (
    <Fragment>
      <Header></Header>
      <Route path="/" component={Home} />
      <Footer></Footer>
    </Fragment>
  );
}

export default App;

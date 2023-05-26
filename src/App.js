import Navbar from "./components/Navbar";
import { Route } from "react-router-dom";
import { Fragment } from "react";
import Home from "./components/Home/Home";
import Footer from "./components/Footer";
import styles from "./App.module.css";

function App() {
  return (
    <Fragment>
      <Navbar />
      <main className={styles.main}>
        <Route path="/" component={Home} />
      </main>
      <Footer></Footer>
    </Fragment>
  );
}

export default App;

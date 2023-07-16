import { Route } from "react-router-dom";
import { Fragment } from "react";
import Home from "./components/Home/Home";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Vehicles from "./components/Vehicles/Vehicles";
import Login from "./components/Auth/Login";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <Fragment>
      <AuthProvider>
        <Navbar></Navbar>
        <Route exact path="/" component={Home} />
        <Route path="/vehicles" component={Vehicles} />
        <Route path="/login" component={Login} />
        <Footer></Footer>
      </AuthProvider>
    </Fragment>
  );
}

export default App;

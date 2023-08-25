import { Route, Routes } from "react-router-dom";
import { Fragment } from "react";
import Home from "./components/Home/Home";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Vehicles from "./components/Vehicles/Vehicles";
import Login from "./components/Auth/Login";
import { AuthProvider } from "./context/AuthContext";
import CreatePost from "./components/Create/CreatePost";
import Details from "./components/Details/Details";
import Register from "./components/Auth/Register";
import MyPosts from "./components/MyPosts/MyPosts";

function App() {
  return (
    <Fragment>
      <AuthProvider>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/my-posts" element={<MyPosts />} />
          <Route path="/details/:id" element={<Details />} />
        </Routes>
        <Footer></Footer>
      </AuthProvider>
    </Fragment>
  );
}

export default App;

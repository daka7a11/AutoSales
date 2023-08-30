import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const authContext = useAuthContext();
  const navigate = useNavigate();

  authContext
    .logout()
    .then(() => navigate("/"))
    .catch((err) => console.log(err));

  console.log(authContext.getUserData());

  return "";
};

export default Logout;

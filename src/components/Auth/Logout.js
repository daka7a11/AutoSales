import { toast } from "react-toastify";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const authContext = useAuthContext();
  const navigate = useNavigate();

  authContext
    .logout()
    .then(() => {
      toast.warn(
        `Bye ${
          authContext.getUserData().username ||
          authContext.getUserData().firstName
        }!`
      );
      navigate("/");
    })
    .catch((err) => console.log(err));

  return "";
};

export default Logout;

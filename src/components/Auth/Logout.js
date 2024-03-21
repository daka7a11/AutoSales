import { toast } from "react-toastify";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Logout = () => {
  const authContext = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    const userData = authContext.logout();
    toast.warn(`Bye ${userData.firstName}!`);
    navigate("/");
  }, []);

  return "";
};

export default Logout;

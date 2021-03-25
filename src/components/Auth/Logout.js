import { useEffect } from "react";
import auth from "../../service/authService";
const Logout = () => {
  useEffect(() => {
    auth.Logout();
    window.location = "/";
  }, []);
  return null;
};

export default Logout;

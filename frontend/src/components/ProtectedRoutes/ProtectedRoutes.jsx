import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function ProtectedRoutes(props) {
  if (localStorage.getItem("userToken")) {
    return props.children;
  } else {
    return <Navigate to={"/login"} />;
  }
}

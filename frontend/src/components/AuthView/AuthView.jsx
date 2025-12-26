import { Navigate } from "react-router-dom";

export default function AuthView(props) {
  if (localStorage.getItem("userToken")) {
    return <Navigate to={"/my-events"} />;
  } else {
    return props.children;
  }
}

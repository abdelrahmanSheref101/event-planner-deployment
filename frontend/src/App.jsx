import Profile from "./components/Profile/Profile";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import NotFound from "./components/NotFound/NotFound";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LayOut from "./components/LayOut/LayOut";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { useContext, useEffect } from "react";
import { tokenContext } from "./Context/tokenContext";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import AuthView from "./components/AuthView/AuthView";
import MyEvents from "./components/MyEvents/MyEvents";
import Invites from "./components/Invites/Invites";
function App() {
  let { setToken } = useContext(tokenContext);
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      setToken(localStorage.getItem("userToken"));
    }
  }, []);
  const routes = createBrowserRouter([
    {
      path: "",
      element: <LayOut />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoutes>
              <Profile />
            </ProtectedRoutes>
          ),
        },
        {
          path: "register",
          element: (
            <AuthView>
              <Register />
            </AuthView>
          ),
        },
        {
          path: "login",
          element: (
            <AuthView>
              <Login />
            </AuthView>
          ),
        },
        {
          path: "profile",
          element: (
            <ProtectedRoutes>
              <Profile />
            </ProtectedRoutes>
          ),
        },
        {
          path: "my-events",
          element: (
            <ProtectedRoutes>
              <MyEvents />
            </ProtectedRoutes>
          ),
        },
        {
          path: "invites",
          element: (
            <ProtectedRoutes>
              <Invites />
            </ProtectedRoutes>
          ),
        },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);
  return (
    <div>
      <RouterProvider router={routes}></RouterProvider>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
export default App;

import NavBar from "../NavBar/NavBar";
import { Outlet } from "react-router-dom";
import styles from "./LayOut.module.css";
export default function layOut() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1 container mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import styles from "./NotFound.module.css";
export default function notFound() {
  return (
    <div className="flex flex-col text-center justify-center h-80 text-gray-800">
      <h2 className="p-2 text-8xl font-bold col-span-full">404</h2>
      <h2 className="p-2 text-5xl">NOT FOUND</h2>
      <p className="p-2 text-2xl">
        The requested URL was not found on this server.
      </p>
    </div>
  );
}

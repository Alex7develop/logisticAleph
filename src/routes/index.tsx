import React from "react";
import { RouteObject, createBrowserRouter } from "react-router-dom";
import TechniciansMapPage from "~/components/pages/TechniciansMapPage/TechniciansMapPage";

const root: RouteObject = {
  path: "/", 
  element: <TechniciansMapPage />, 
};

const router = createBrowserRouter([ root ]);
export default router;


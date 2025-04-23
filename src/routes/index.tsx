import React from "react";
import { RouteObject, createBrowserRouter } from "react-router-dom";

// Убраны все лишние импорты страниц, лэйаутов, роутов
import TechniciansMapPage from "~/components/pages/TechniciansMapPage/TechniciansMapPage";

const root: RouteObject = {
  path: "/", // Основной путь
  element: <TechniciansMapPage />, // Сразу рендерим страницу карты
  // Убраны все дочерние и вложенные роуты, авторизация и т.д.
};

const router = createBrowserRouter([ root ]);
export default router;


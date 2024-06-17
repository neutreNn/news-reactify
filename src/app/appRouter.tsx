import { createBrowserRouter }from "react-router-dom";
import BaseLayout from "./layouts/BaseLayout";
import { MainPage } from "@/Pages/main";
import { NewsPage } from "@/Pages/news";

export const appRouter = createBrowserRouter([
  {
    element: <BaseLayout />,
    errorElement: <div>Error</div>,
    children: [
        {path: "/", element: <MainPage />}, 
        {path: "/news/:id", element: <NewsPage />},
    ]
  }
]);
import { createBrowserRouter } from "react-router-dom";
import { MainLayout, RootLayout } from "@/core/layouts";
import { Error404Page, KanbanPage, TaskListPage } from "@/pages";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error404Page />,
    children: [
      {
        path: "app",
        element: <MainLayout />,
        children: [
          {
            path: "tasklist",
            element: <TaskListPage />,
          },
          {
            path: "kanban",
            element: <KanbanPage />,
          },
          //? TODO: Add custom boards
          //? {
          //?   path: "boards",
          //?   element: <BoardsPage />,
          //? },
        ],
      },
    ],
  },
]);

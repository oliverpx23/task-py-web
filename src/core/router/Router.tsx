import { createBrowserRouter } from "react-router-dom";
import { MainLayout, RootLayout, TasksLayout } from "@/core/layouts";
import { Error404Page, KanbanPage, TaskListPage, BoardsPage } from "@/pages";

export const appRoutes = {
  tasks: {
    kanban: '/app/tasks/kanban',
    list: '/app/tasks/list',
  },
  boards: "/app/boards",
};

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
            path: "tasks",
            element: <TasksLayout />,
            children: [
              {
                path: "kanban",
                element: <KanbanPage />,
              },
              {
                path: "list",
                element: <TaskListPage />,
              },
            ],
          },
          {
            path: "boards",
            element: <BoardsPage />,
          },
        ],
      },
    ],
  },
]);

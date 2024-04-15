import { TaskStatus } from "@/interfaces";

export const appRoutes = {
    tasksList: '/app/tasklist',
    kanban: "/app/kanban",
    //? boards: "/app/boards",
};
  

export const classColorMap: {
    [K in TaskStatus]: string;
}  = {
    "pending": "warning-800",
    "in-progress": "primary-800",
    "done": "success-800",
}
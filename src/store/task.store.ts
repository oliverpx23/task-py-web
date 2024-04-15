import { fakeUsers } from "@/core/config/fake-users";
import { Task, TaskStatus } from "@/interfaces";
import { StateCreator, create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface TaskState {
  draggingTaskId?: number;
  tasks: Task[];
}

interface TaskActions {
  getTaskByStatus: (status: TaskStatus) => Task[];
  getTaskById: (taskId: number) => Task | undefined;
  setDraggingTaskId: (taskId: number) => void;
  removeDraggingTaskId: () => void;
  changeStatus: (taskId: number, status: TaskStatus) => void;
  onTaskDrop: (status: TaskStatus) => void;
  // addTask: (title: string, status: TaskStatus) => void;
}

type TaskStore = TaskState & TaskActions;
type TaskMiddlewares = [["zustand/devtools", never], ["zustand/immer", never]];

const storeApi: StateCreator<TaskStore, TaskMiddlewares> = (set, get) => ({
  draggingTaskId: undefined,
  tasks: [
    { id: 1, status: 'pending', name: 'Login page', description: 'Desarrollar pagina de login con tailwind css', assignedTo: fakeUsers[0] },
    { id: 2, status: 'in-progress', name: 'Dashboard page', description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ad nam aliquam temporibus cum rerum placeat pariatur ab iusto deleniti, cupiditate quibusdam reiciendis magni non optio vitae sit saepe excepturi omnis!', assignedTo: fakeUsers[1] },
    { id: 3, status: 'done', name: 'Register page', description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ad nam aliquam temporibus cum rerum placeat pariatur ab iusto deleniti, cupiditate quibusdam reiciendis magni non optio vitae sit saepe excepturi omnis! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ad nam aliquam temporibus cum rerum placeat pariatur ab iusto deleniti, cupiditate quibusdam reiciendis magni non optio vitae sit saepe excepturi omnis!', assignedTo: fakeUsers[0] },
    { id: 4, status: 'pending', name: 'Print page', description: 'Desarrollar pagina de login con tailwind css', assignedTo: fakeUsers[1] },
    { id: 5, status: 'in-progress', name: 'Report page', description: 'Desarrollar pagina de login con tailwind css', assignedTo: fakeUsers[0] },
    { id: 6, status: 'pending', name: 'Commit to github', description: 'Desarrollar pagina de login con tailwind css', assignedTo: fakeUsers[1] },

  ],

  getTaskByStatus: (status: TaskStatus) => {
    return get().tasks.filter((task) => task.status === status);
  },

  getTaskById: (taskId) => {
    const task = get().tasks.find(task => task.id == taskId);
    return task;
  },

  setDraggingTaskId: (taskId: number) => {
    set({ draggingTaskId: taskId });
  },

  removeDraggingTaskId: () => {
    set({ draggingTaskId: undefined });
  },

  changeStatus: (taskId, status) => {
    const selectedTask = get().getTaskById(taskId);
    if(!selectedTask) return;
    selectedTask.status = status;
    set({ tasks: get().tasks.map(task => {
      if(task.id != selectedTask.id) return task;
      return selectedTask;
    }) });
  },

  onTaskDrop: (status: TaskStatus) => {
    const taskId = get().draggingTaskId;
    if (taskId) {
      get().changeStatus(taskId, status);
      get().removeDraggingTaskId();
    }
  },

  // addTask: (title: string, status: TaskStatus) => {
  //   const newTask = { id: uuidV4(), title, status };
  //   set((state) => {
  //     state.tasks[newTask.id] = newTask;
  //   });
  // },

});

export const useTaskStore = create<TaskStore>()(
  devtools(persist(immer(storeApi), { name: "task-storage" }))
);

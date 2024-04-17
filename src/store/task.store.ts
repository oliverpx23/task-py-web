import { Task, TaskDto, TaskStatus } from "@/interfaces";
import { TasksService } from "@/services/task.service";
import { StateCreator, create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface TaskState {
  isLoading: boolean;
  isSaving: boolean;
  draggingTaskId?: number;
  tasks: Task[];
}

interface TaskActions {
  getTasks: () => void;
  getTaskByStatus: (status: TaskStatus) => Task[];
  getTaskById: (taskId: number) => Task | undefined;
  setDraggingTaskId: (taskId: number) => void;
  removeDraggingTaskId: () => void;
  changeStatus: (taskId: number, status: TaskStatus) => void;
  onTaskDrop: (status: TaskStatus) => void;
  addTask: (task: TaskDto) => Promise<void> | void;
  deleteTask: (taskId: number | string) => void;
}

export type TaskStore = TaskState & TaskActions;
type TaskMiddlewares = [["zustand/immer", never]];

const storeApi: StateCreator<TaskStore, TaskMiddlewares> = (set, get) => ({
  isLoading: false,
  isSaving: false,
  draggingTaskId: undefined,
  tasks: [],

  getTasks: async () => {
    set({ isLoading: true });
    const tasks = await TasksService.getTasks();
    if (!tasks) return;
    set({ tasks, isLoading: false });
  },

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

  changeStatus: async (taskId, status) => {

    const selectedTask = get().getTaskById(taskId);
    if(!selectedTask) return;
    selectedTask.status = status;

    set({ 
      tasks: get().tasks.map(task => {
        if(task.id != selectedTask.id) return task;
        return selectedTask;
      }) 
    });

    set({ isSaving: true });

    const updatedTask = await TasksService.updateTask({
      ...selectedTask,
      status
    });

    if(!updatedTask) return;
    get().getTasks();

    set({ isSaving: false });

  },

  onTaskDrop: (status: TaskStatus) => {
    const taskId = get().draggingTaskId;
    if (taskId) {
      get().changeStatus(taskId, status);
      get().removeDraggingTaskId();
    }
  },

  addTask: async (task: TaskDto) => {
    set({ isSaving: true });
    const newTask = await TasksService.createTask(task);
    if (newTask) {
      get().getTasks();
    }
    set({ isSaving: false });

  },

  deleteTask: async (taskId: number | string) => {
    set({ isSaving: true });
    const deletedTask = await TasksService.deleteTask(taskId);
    if (deletedTask) {
      get().getTasks();
    }
    set({ isSaving: false });
  }

});

export const useTaskStore = create<TaskStore>()(
  immer(storeApi)
);

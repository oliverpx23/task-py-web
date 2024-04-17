import { taskpyApi } from "@/core/api/taskpy.apiclient";
import { Task, TaskDto } from "@/interfaces";
import { AxiosError } from "axios";

export class TasksService {

  static async getTasks() {
    try {
      const { data } = await taskpyApi.get<Task[]>("/v1/tasks/");
      console.log("getTasks => ", data);
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.warn("getTasks error =>", error.response?.data);
        throw new Error(error.response?.data);
      }
      console.warn("getTasks unexpected error =>", error);
      throw new Error("Unexpected error");
    }
  }

  static async createTask(task: TaskDto) {
    try {
      const { data } = await taskpyApi.post<Task>("/v1/tasks/", task);
      console.log("createTask => ", data);
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.warn("createTask error =>", error.response?.data);
        throw new Error(error.response?.data);
      }
      console.warn("getTasks unexpected error =>", error);
      throw new Error("Unexpected error");
    }
  }

  static async updateTask(task: Partial<TaskDto>) {
    try {
      const { data } = await taskpyApi.put<Task>(`/v1/tasks/${task.id}/`, task);
      console.log("updateTask => ", data);
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.warn("updateTask error =>", error.response?.data);
        throw new Error(error.response?.data);
      }
      console.warn("getTasks unexpected error =>", error);
      throw new Error("Unexpected error");
    }
  }

  static async deleteTask(taskId: number | string) {
    try {
      await taskpyApi.delete<Task>(`/v1/tasks/${taskId}/`);
      console.log("deleteTask => ", true);
      return true;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.warn("deleteTask error =>", error.response?.data);
        throw new Error(error.response?.data);
      }
      console.warn("deleteTask unexpected error =>", error);
      throw new Error("Unexpected error");
    }
  }
}

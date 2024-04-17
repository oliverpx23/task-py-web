import { taskpyApi } from "@/core/api/taskpy.apiclient";
import { User } from "@/interfaces";
import { AxiosError } from 'axios'


export class UsersService {

  static async getUsers() {
    try {
      const { data } = await taskpyApi.get<User[]>("/v1/users/");
      console.log('getUsers => ', data);
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.warn('getUsers error =>',error.response?.data);
        throw new Error(error.response?.data);
      }
      console.log('getUsers unexpected error =>', error);
      throw new Error("Unexpected error");
    }
  }


}

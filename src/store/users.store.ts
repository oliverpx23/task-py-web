import { User } from "@/interfaces";
import { UsersService } from "@/services";
import { StateCreator, create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface UsersState {
  isLoading: boolean;
  hasError: boolean;
  users: User[]
}

interface UsersActions {
  getUsers: () => void;

}


export type UsersStore = UsersState & UsersActions;
type UsersMiddlewares = [["zustand/immer", never]];



const storeApi: StateCreator<UsersStore, UsersMiddlewares> = (set) => ({
  isLoading: false,
  hasError: false,
  users: [],


  getUsers: async () => {
    console.log('executing getUsers')
    try {
      set({ isLoading: true });
      const users = await UsersService.getUsers();
      set({ users, isLoading: false });
    } catch (error) {
      set({ isLoading : false, hasError: true })
    }

  }

});


export const useUsersStore = create<UsersStore>()(
  immer(storeApi)
);

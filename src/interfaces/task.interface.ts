import { User } from "./user.interface";

export type TaskStatus = 'pending' | 'in-progress' | 'done'

export interface Task {
    id: number;
    name: string;
    description: string;
    assignedTo: User;
    status: TaskStatus
}
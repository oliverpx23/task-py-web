import { User } from "./user.interface";

export type TaskStatus = 'pending' | 'in-progress' | 'done'

export interface Task {
    id: number;
    name: string;
    description: string;
    "assigned_to": number;
    "assigned_to_user": User;
    status: TaskStatus
}


export interface TaskDto {
    id?: number;
    name: string;
    description: string;
    "assigned_to": number;
    status: TaskStatus
}
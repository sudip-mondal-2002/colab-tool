import {TaskPriority, TaskStatus} from ".prisma/client";

export type TaskDTO = {
    id: string
    name: string
    description: string
    priority: TaskPriority
    status: TaskStatus
}
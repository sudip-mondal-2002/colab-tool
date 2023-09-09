import {Role} from "@prisma/client";

export type WorkspaceDTO = {
    id: string
    name: string
    description: string
    role: Role
}
import {NextRequest, NextResponse} from "next/server";
import {TaskDTO} from "@/types/TaskDTO";
import {getUser} from "@/utils/getUser";
import {UnauthorizedError} from "@/errors/UnauthorizedError";
import prisma from "@/utils/prisma";
import { NotFoundError } from "@/errors/NotFoundError";
type Params = {
    workspaceId: string
}
export const GET = async (req: NextRequest, {params}:{
    params: Params
}): Promise<NextResponse<TaskDTO[]>> => {
    const user = await getUser(req)
    if(!user){
        throw new UnauthorizedError("You are not logged in")
    }
    const tasks = await prisma.task.findMany({
        where: {
            workspaceId: params.workspaceId
        }
    })
    const taskDTOs: TaskDTO[] = tasks.map(task => {
        return {
            id: task.id,
            name: task.name,
            description: task.description || "",
            priority: task.priority,
            status: task.status
        }
    })
    return NextResponse.json(taskDTOs)
}

export const POST = async (req: NextRequest, {params}:{
    params: Params
}): Promise<NextResponse<TaskDTO>> => {
    const user = await getUser(req)
    if(!user){
        throw new UnauthorizedError("You are not logged in")
    }
    const {name, description, priority, status, userEmail} = await req.json()
    const targetUser = await prisma.user.findUnique({
        where: {
            email: userEmail
        }
    })
    if(!targetUser){
        throw new NotFoundError("User not found")
    }
    const task = await prisma.task.create({
        data: {
            name,
            description,
            priority,
            status,
            workspaceId: params.workspaceId,
            userId: targetUser?.id
        }
    })
    return NextResponse.json({
        id: task.id,
        name: task.name,
        description: task.description || "",
        priority: task.priority,
        status: task.status
    })
}
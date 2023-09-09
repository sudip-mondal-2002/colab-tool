import {NextRequest, NextResponse} from "next/server";
import {TaskDTO} from "@/types/TaskDTO";
import {getUser} from "@/utils/getUser";
import {UnauthorizedError} from "@/errors/UnauthorizedError";
import prisma from "@/utils/prisma";

export const GET = async (req: NextRequest): Promise<NextResponse<TaskDTO[]>> => {
    const user = await getUser(req)
    if(!user){
        throw new UnauthorizedError("You are not logged in")
    }
    const tasks = await prisma.task.findMany({
        where: {
            userId: user.id
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
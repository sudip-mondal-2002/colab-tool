import { NextRequest } from 'next/server'
import { getUser } from '@/utils/getUser'
import {UnauthorizedError} from "@/errors/UnauthorizedError";
import prisma from "@/utils/prisma";

type Params = {
    workspaceId: string
}

export const GET = async (req: NextRequest, {params}: {params: Params}) => {
    const {workspaceId} = params
    const user = await getUser(req)
    if(!user){
        throw new UnauthorizedError('Not Logged in')
    }
    const workspaceUser = await prisma.workspaceUsers.findFirst({
        where: {
            workspaceId,
            userId: user.id
        },
        include: {
            workspace: {
                include: {
                    tasks: true
                }
            }
        }
    })
    if(!workspaceUser){
        throw new UnauthorizedError("Access denied")
    }
    return workspaceUser.workspace.tasks
}
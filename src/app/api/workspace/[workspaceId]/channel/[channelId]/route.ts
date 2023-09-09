import {NextRequest, NextResponse} from "next/server";
import {getUser} from "@/utils/getUser";
import {UnauthorizedError} from "@/errors/UnauthorizedError";
import prisma from "@/utils/prisma";
import {NotFoundError} from "@/errors/NotFoundError";
import {UserRole} from "@prisma/client";


type Params = {
    workspaceId: string,
    channelId: string
}

export const GET = async (req: NextRequest, {params}: {params: Params}) => {
    const {workspaceId, channelId} = params
    const user = await getUser(req)
    if(!user){
        throw new UnauthorizedError('Not Logged in')
    }
    const channel = await prisma.channel.findFirst({
        where: {
            id: channelId,
            workspaceId
        },
        include: {
            users: true
        }
    })
    if(!channel){
        throw new NotFoundError("Channel not found")
    }
    const channelUser = channel.users.find(u => u.userId === user.id)
    if(!channelUser){
        throw new UnauthorizedError("Not in channel")
    }
    return NextResponse.json(channel)
}

export const DELETE = async (req: NextRequest, {params}: {params: Params}) => {
    const {workspaceId, channelId} = params
    const user = await getUser(req)
    if(!user){
        throw new UnauthorizedError('Not Logged in')
    }
    const workspaceUser = await prisma.workspaceUsers.findFirst({
        where: {
            workspaceId,
            userId: user.id,
            role: {
                in: [UserRole.ADMIN, UserRole.OWNER]
            }
        }
    })
    if (!workspaceUser){
        throw new UnauthorizedError("Access denied")
    }
    const channel = await prisma.channel.findFirst({
        where: {
            id: channelId,
            workspaceId
        }
    })
    if(!channel){
        throw new NotFoundError("Channel not found")
    }
    await prisma.channel.delete({
        where: {
            id: channelId
        }
    })
}
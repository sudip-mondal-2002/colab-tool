import {NextRequest, NextResponse} from "next/server";
import {getUser} from "@/utils/getUser";
import {UnauthorizedError} from "@/errors/UnauthorizedError";
import prisma from "@/utils/prisma";
import {NotFoundError} from "@/errors/NotFoundError";
import {UserRole} from "@prisma/client";
type Params = {
    workspaceId: string
}
export const POST = async (req: NextRequest, {params}: {params: Params}) => {
    const {workspaceId} = params
    const user = await getUser(req)
    const body = await req.json()
    if(!user){
        throw new UnauthorizedError('Not Logged in')
    }
    const workspaceUser = await prisma.workspaceUsers.findFirst({
        where: {
            workspaceId,
            userId: user.id
        }
    })
    if (!workspaceUser){
        throw new NotFoundError("Workspace not found")
    }
    if(workspaceUser.role === UserRole.MEMBER){
        throw new UnauthorizedError("Members can't create channels")
    }
    const channel = await prisma.channel.create({
        data: {
            name: body.name,
            workspaceId: workspaceId
        }
    })
    await prisma.channelUsers.create({
        data: {
            channelId: channel.id,
            userId: user.id
        }
    })

    return NextResponse.redirect(`/api/workspace/${workspaceId}/channel/${channel.id}`)
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
                    channels: true
                }
            }
        }
    })
    if (!workspaceUser){
        throw new NotFoundError("Workspace not found")
    }

    return NextResponse.json(workspaceUser.workspace.channels)
}
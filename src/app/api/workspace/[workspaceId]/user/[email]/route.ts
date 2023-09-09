import {NextRequest, NextResponse} from "next/server";
import prisma from "@/utils/prisma";
import {BadRequestError} from "@/errors/BadRequestError";
import {getUser} from "@/utils/getUser";
import {UnauthorizedError} from "@/errors/UnauthorizedError";
import {UserRole} from "@prisma/client";
type Params = {
    email: string,
    workspaceId: string
}
export const POST = async (req: NextRequest, {params}: {params: Params}) => {
    const {email, workspaceId} = params
    const user = await getUser(req)
    if(!user){
        throw new UnauthorizedError('Access denied')
    }
    const workspaceUsers = await prisma.workspaceUsers.findMany({
        where: {
            workspaceId
        }
    })

    const isUserPresent = workspaceUsers.find(
        workspaceUser => workspaceUser.userId === user.id &&
            (workspaceUser.role === UserRole.ADMIN || workspaceUser.role === UserRole.OWNER)
    )
    if(!isUserPresent){
        throw new UnauthorizedError('Access denied')
    }
    const userToAdd = await prisma.user.findUnique({
        where: {
            email
        }
    })
    if(!userToAdd){
        throw new BadRequestError('User not found')
    }
    const isUserAlreadyPresent = workspaceUsers.find((workspaceUser) => workspaceUser.userId === userToAdd.id)
    if(isUserAlreadyPresent){
        throw new BadRequestError('User already present')
    }
    await prisma.workspaceInvites.create({
        data: {
            userId: userToAdd.id,
            workspaceId,
            role: UserRole.MEMBER
        }
    })
    return NextResponse.json({
        success: true
    })
}

export const DELETE = async (req: NextRequest, {params}: {params: Params}) => {
    const user = await getUser(req)
    if(!user){
        throw new UnauthorizedError('Access denied')
    }
    const userToDelete = (await prisma.workspaceUsers.findFirst({
        where: {
            workspaceId: params.workspaceId,
            userId: user.id
        },
        include: {
            user: true
        }
    }))
    const userRole = (await prisma.workspaceUsers.findFirst({
        where: {
            workspaceId: params.workspaceId,
            userId: user.id
        }
    }))?.role
    if(!userRole){
        throw new UnauthorizedError('Access denied')
    }
    if(!userToDelete){
        throw new BadRequestError('User not found')
    }
    if (userToDelete.role === UserRole.OWNER) {
        throw new BadRequestError('Cannot delete owner')
    }
    if (userToDelete.role === UserRole.ADMIN && userRole !== UserRole.OWNER) {
        throw new BadRequestError('Cannot delete admin')
    }
    await prisma.workspaceUsers.delete({
        where: {
            id: userToDelete.id
        }
    })
}
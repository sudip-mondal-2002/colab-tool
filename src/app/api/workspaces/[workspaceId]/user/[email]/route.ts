import {NextRequest, NextResponse} from "next/server";
import {getUser} from "@/utils/getUser";
import {UnauthorizedError} from "@/errors/UnauthorizedError";
import prisma from "@/utils/prisma";
import {NotFoundError} from "@/errors/NotFoundError";

type Params = {
    workspaceId: string
    email: string
}

export const POST = async (req: NextRequest, {params}:{params:Params}) : Promise<NextResponse<{}>> => {
    const {workspaceId, email} = params
    const {role} = await req.json()
    const user = await getUser(req)
    if(!user){
        throw new UnauthorizedError("You are not logged in")
    }
    const workspaceUser = await prisma.workspaceUser.findFirst({
        where: {
            workspaceId,
            userId: user.id
        }
    })
    if(!workspaceUser){
        throw new NotFoundError("Workspace not found")
    }
    if(workspaceUser.role !== 'ADMIN' && workspaceUser.role !== 'OWNER'){
        throw new UnauthorizedError("Access denied")
    }
    const userToAdd = await prisma.user.findUnique({
        where: {
            email
        }
    })
    if(!userToAdd){
        throw new NotFoundError("User not found")
    }
    await prisma.workspaceUser.create({
        data: {
            userId: userToAdd.id,
            workspaceId,
            role: role
        }
    })
    return NextResponse.json({})
}

export const DELETE = async (req: NextRequest, {params}: {params: Params}) : Promise<NextResponse<{}>> => {
    const {workspaceId, email} = params
    const user = await getUser(req)
    if(!user){
        throw new UnauthorizedError("You are not logged in")
    }
    const userToDelete = await prisma.user.findUnique({
        where: {
            email
        }
    })
    if(!userToDelete){
        throw new NotFoundError("User not found")
    }
    const workspaceUser = await prisma.workspaceUser.findMany({
        where: {
            workspaceId,
            userId: {
                in: [user.id, userToDelete.id]
            }
        }
    })
    if(workspaceUser.length !== 2){
        throw new NotFoundError("User not found")
    }
    const workspaceUserToDeleteRole = workspaceUser.find(wu => wu.userId === userToDelete.id)?.role
    const userRole = workspaceUser.find(wu => wu.userId === user.id)?.role
    if(userRole !== 'ADMIN' && userRole !== 'OWNER'){
        throw new UnauthorizedError("Access denied")
    }
    if(workspaceUserToDeleteRole === 'OWNER'){
        throw new UnauthorizedError("Cannot delete owner")
    }
    const deleteRowId = workspaceUser.find(wu => wu.userId === userToDelete.id)?.id
    await prisma.workspaceUser.delete({
        where: {
            id: deleteRowId
        }
    })
    return NextResponse.json({})
}
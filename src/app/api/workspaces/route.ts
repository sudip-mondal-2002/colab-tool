import {WorkspaceDTO} from "@/types/WorkspaceDTO";
import {NextRequest, NextResponse} from "next/server";
import {getUser} from "@/utils/getUser";
import {UnauthorizedError} from "@/errors/UnauthorizedError";
import prisma from "@/utils/prisma";
import {BadRequestError} from "@/errors/BadRequestError";
import {Role} from "@prisma/client";

export const GET = async (req: NextRequest): Promise<NextResponse<WorkspaceDTO[]>> => {
    const user = await getUser(req);
    if (!user) {
        throw new UnauthorizedError("You are not logged in")
    }
    const workspaces = await prisma.workspaceUser.findMany({
        where: {
            userId: user.id
        },
        include: {
            workspace: true
        }
    })
    const workspaceDTOs: WorkspaceDTO[] = workspaces.map(workspace => {
        return {
            id: workspace.workspace.id,
            name: workspace.workspace.name,
            description: workspace.workspace.description,
            role: workspace.role
        }
    })
    return NextResponse.json(workspaceDTOs)
}

export const POST = async (req: NextRequest): Promise<NextResponse<WorkspaceDTO>> => {
    const user = await getUser(req);
    if (!user) {
        throw new UnauthorizedError("You are not logged in")
    }
    const body = await req.json()
    const {name, description} = body
    if (!name || !description) {
        throw new BadRequestError('Please fill all fields')
    }
    const workspace = await prisma.workspace.create({
        data: {
            name,
            description,
            users: {
                create: {
                    userId: user.id,
                    role: Role.OWNER
                }
            }
        }
    })
    return NextResponse.json({
        id: workspace.id,
        name: workspace.name,
        description: workspace.description,
        role: Role.OWNER
    })
}

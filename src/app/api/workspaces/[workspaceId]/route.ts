import {NextRequest, NextResponse} from "next/server";
import {WorkspaceDTO} from "@/types/WorkspaceDTO";
import {getUser} from "@/utils/getUser";
import {UnauthorizedError} from "@/errors/UnauthorizedError";
import prisma from "@/utils/prisma";
import {NotFoundError} from "@/errors/NotFoundError";

export type Params = {
    workspaceId: string
}

export const GET = async (req: NextRequest, {params}: { params: Params }): Promise<NextResponse<WorkspaceDTO>> => {
    const {workspaceId} = params
    const user = await getUser(req)
    if (!user) {
        throw new UnauthorizedError('Not Logged in')
    }
    const workspace = await prisma.workspaceUser.findFirst({
        where: {
            workspaceId,
            userId: user.id
        },
        include: {
            workspace: true
        }
    })
    if (!workspace) {
        throw new NotFoundError("Workspace not found")
    }
    return NextResponse.json({
        id: workspace.workspaceId,
        name: workspace.workspace.name,
        description: workspace.workspace.description,
        role: workspace.role
    })
}
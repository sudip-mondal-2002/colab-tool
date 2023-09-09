import {NextRequest, NextResponse} from "next/server";
import {getUser} from "@/utils/getUser";
import prisma from "@/utils/prisma";
import {NotFoundError} from "@/errors/NotFoundError";

type Params = {
    workspaceId: string
}
export const GET = async (req: NextRequest, {params}: {params: Params}) => {
    const user = await getUser(req);
    const workspaceUser = await prisma.workspaceUsers.findFirst({
        where: {
            workspaceId: params.workspaceId,
            userId: user?.id
        },
        include: {
            workspace: true
        }
    });
    if (!workspaceUser) {
        throw new NotFoundError("Workspace not found")
    }
    const workspace = workspaceUser.workspace;
    return NextResponse.json(workspace)
}

export const PUT = async (req: NextRequest, {params}: {params: Params}) => {
    const user = await getUser(req);
    const workspaceUser = await prisma.workspaceUsers.findFirst({
        where: {
            workspaceId: params.workspaceId,
            userId: user?.id
        },
        include: {
            workspace: true
        }
    });
    if (!workspaceUser) {
        throw new NotFoundError("Workspace not found")
    }
    const workspace = workspaceUser.workspace;
    const body = await req.json();
    const {name} = body;
    await prisma.workspace.update({
        where: {
            id: workspace.id
        },
        data: {
            name
        }
    });
    return NextResponse.json(workspace)
}
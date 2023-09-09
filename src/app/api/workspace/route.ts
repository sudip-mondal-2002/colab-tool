import {NextRequest, NextResponse} from "next/server";
import {getUser} from "@/utils/getUser";
import {UnauthorizedError} from "@/errors/UnauthorizedError";
import prisma from "@/utils/prisma";
import {UserRole} from "@prisma/client";
export const POST = async (req: NextRequest) => {
    const body = await req.json();
    const {name : workspaceName} = body;
    const user = await getUser(req);
    if (!user) {
        throw new UnauthorizedError("You are not logged in")
    }
    const workspace = await prisma.workspace.create({
        data: {
            name: workspaceName,
        }
    });
    await prisma.workspaceUsers.create({
        data: {
            userId: user.id,
            workspaceId: workspace.id,
            role: UserRole.OWNER
        }
    });
    return NextResponse.json({})
}

export const GET = async (req: NextRequest) => {
    const user = await getUser(req);
    if (!user) {
        throw new UnauthorizedError("You are not logged in")
    }
    const workspaces = await prisma.workspaceUsers.findMany({
        where: {
            userId: user.id
        },
        include: {
            workspace: true
        }
    });
    return NextResponse.json(workspaces)
}
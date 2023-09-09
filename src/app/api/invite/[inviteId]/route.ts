import {NextRequest, NextResponse} from "next/server";
import {getUser} from "@/utils/getUser";
import {UnauthorizedError} from "@/errors/UnauthorizedError";
import prisma from "@/utils/prisma";
type Params = {
    inviteId: string;
}
export const POST = async (req: NextRequest, {params}:{
    params: Params;
}) => {
    const {inviteId} = params;
    const user = await getUser(req);
    if (!user) {
        throw new UnauthorizedError("You are not logged in")
    }
    const workspaceInvite = await prisma.workspaceInvites.findUnique({
        where: {
            id: inviteId,
            userId: user.id
        }
    })
    if (!workspaceInvite) {
        throw new UnauthorizedError("You are not authorized to join this workspace")
    }
    await prisma.workspaceUsers.create({
        data: {
            userId: user.id,
            workspaceId: workspaceInvite.workspaceId,
            role: workspaceInvite.role
        }
    })
    await prisma.workspaceInvites.delete({
        where: {
            id: inviteId
        }
    })
    return NextResponse.json({})
}
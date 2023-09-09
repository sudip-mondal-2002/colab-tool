import {NextRequest, NextResponse} from "next/server";
import prisma from "@/utils/prisma";

type Params = {
    workspaceId: string,
}
export const GET = async (req: NextRequest, {params}: { params: Params }) => {
    const {workspaceId} = params
    const users = await prisma.workspaceUsers.findMany({
        where: {
            workspaceId
        },
        include: {
            user: true
        }
    })
    const invites = await prisma.workspaceInvites.findMany({
        where: {
            workspaceId
        }
    })
    const result = {
        users,
        invites
    }
    return NextResponse.json(result)
}
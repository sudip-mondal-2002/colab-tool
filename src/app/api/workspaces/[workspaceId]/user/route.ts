import {UserDTO} from "@/types/UserDTO";
import {NextRequest, NextResponse} from "next/server";
import {getUser} from "@/utils/getUser";
import {UnauthorizedError} from "@/errors/UnauthorizedError";
import prisma from "@/utils/prisma";
import {NotFoundError} from "@/errors/NotFoundError";

type Params = {
    workspaceId: string
}

export const GET = async (req: NextRequest, {params}: { params: Params}): Promise<NextResponse<UserDTO[]>> => {
    const user = await getUser(req);
    const {workspaceId} = params
    if (!user) {
        throw new UnauthorizedError("You are not logged in")
    }
    const workspaces = await prisma.workspaceUser.findMany({
        where: {
            workspaceId: workspaceId,
        },
        include: {
            user: true
        }
    })
    if (!workspaces) {
        throw new NotFoundError("Workspace not found")
    }
    const isUserPresent = workspaces.find(workspace => workspace.user.id === user.id)
    if(!isUserPresent){
        throw new UnauthorizedError("Access denied")
    }
    const userDTOs: UserDTO[] = workspaces.map(workspace => {
        return {
            id: workspace.user.id,
            name: workspace.user.name,
            email: workspace.user.email
        }
    })
    return NextResponse.json(userDTOs)
}
import {NextRequest} from "next/server";
import prisma from "@/utils/prisma";
import {BadRequestError} from "@/errors/BadRequestError";
import {getUser} from "@/utils/getUser";
import {UnauthorizedError} from "@/errors/UnauthorizedError";
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
            userId: user.id
        }
    })

    // if (workspaceUsers.map())

}
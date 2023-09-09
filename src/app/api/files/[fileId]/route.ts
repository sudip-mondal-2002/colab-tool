import {NextRequest, NextResponse} from "next/server";
import {getUser} from "@/utils/getUser";
import {UnauthorizedError} from "@/errors/UnauthorizedError";
import prisma from "@/utils/prisma";
import axios from "axios";

export type Params = {
    fileId: string
}
export const GET = async (req: NextRequest, {params}:{
    params: Params
}) => {
    const user = await getUser(req)
    if (!user){
        throw new UnauthorizedError("You must be logged in to access this route")
    }
    const {fileId} = params
    const file = await prisma.file.findUnique({
        where: {
            id: fileId
        },
        include: {
            workspace: {
                include: {
                    users: true
                }
            }
        }
    })

    if (!file){
        return {
            status: 404,
            body: {
                error: "File not found"
            }
        }
    }

    const workspaceUsers = file.workspace.users.map(user => user.userId)
    if (!workspaceUsers.includes(user.id)){
        throw new UnauthorizedError("You must be a member of the workspace to access this file")
    }
    const data = (await axios.get(file.content)).data

    const res =  new NextResponse(data)
    res.headers.set("Content-disposition", `attachment; filename=${file.name}`)
    return res
}
import {NextRequest, NextResponse} from "next/server";
import prisma from "@/utils/prisma";

type Params = {
    workspaceId: string
}
export const GET = async (req: NextRequest, {params}: {params: Params}) => {
    const {workspaceId} = params
    const files = (await prisma.file.findMany({
        where: {
            workspaceId
        }
    })).map(file => {
        return {
            id: file.id,
            name: file.name,
        }
    })
    return NextResponse.json(files)
}

export const POST = async (req: NextRequest, {params}: {params: Params}) => {
    const {workspaceId} = params
    const {name, content} = await req.json()
    const file = await prisma.file.create({
        data: {
            name,
            content,
            workspaceId
        }
    })
    return NextResponse.json({
        id: file.id,
        name: file.name
    })
}
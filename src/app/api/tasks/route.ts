import {NextRequest, NextResponse} from "next/server";
import {getUser} from "@/utils/getUser";
import prisma from "@/utils/prisma";
import {UnauthorizedError} from "@/errors/UnauthorizedError";

export const GET = async (req: NextRequest) => {
    const user = await getUser(req);
    if (!user) {
        throw new UnauthorizedError("You are not logged in")
    }
    const tasks = await prisma.task.findMany({
        where: {
            userId: user.id
        }
    })
    return NextResponse.json(tasks)
}


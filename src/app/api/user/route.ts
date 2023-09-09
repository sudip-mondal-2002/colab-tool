import {NextRequest, NextResponse} from "next/server";
import {getUser} from "@/utils/getUser";
import {UnauthorizedError} from "@/errors/UnauthorizedError";

export const GET = async (req: NextRequest) => {
    const user = await getUser(req);
    if (!user) {
        throw new UnauthorizedError("You are not logged in")
    }
    return NextResponse.json({
        email: user.email,
        name: user.name
    })
}
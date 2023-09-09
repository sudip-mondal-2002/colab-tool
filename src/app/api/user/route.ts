import {NextRequest, NextResponse} from "next/server";
import {getUser} from "@/utils/getUser";
import {UnauthorizedError} from "@/errors/UnauthorizedError";
import {UserDTO} from "@/types/UserDTO";

export const GET = async (req: NextRequest): Promise<NextResponse<UserDTO>> => {
    const user = await getUser(req);
    if (!user) {
        throw new UnauthorizedError("You are not logged in")
    }
    return NextResponse.json({
        id: user.id,
        email: user.email,
        name: user.name
    })
}
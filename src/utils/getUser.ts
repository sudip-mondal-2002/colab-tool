import {NextRequest} from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/utils/prisma";
import {UserDTO} from "@/types/UserDTO";
export const getUser = async (req: NextRequest): Promise<UserDTO | null> => {
    const token = req.cookies.get("token");
    if (!token) {
        return null;
    }
    const payload = jwt.verify(token.value, process.env.JWT_SECRET!) as { email: string };
    const user = await prisma.user.findUnique({
        where: {
            email: payload.email
        }
    })
    if (!user) {
        return null;
    }
    return {
        id: user.id,
        name: user.name,
        email: user.email
    }
}

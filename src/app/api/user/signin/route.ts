import {NextRequest, NextResponse} from "next/server";
import bcrypt from 'bcrypt'
import prisma from "@/utils/prisma";
import jwt from 'jsonwebtoken'
import {BadRequestError} from "@/errors/BadRequestError";
import {NotFoundError} from "@/errors/NotFoundError";
import {UnauthorizedError} from "@/errors/UnauthorizedError";
export const POST = async (req: NextRequest) => {
    const body = await req.json()
    const {name, email, password} = body
    if (!email || !password) {
        throw new BadRequestError('Please fill all fields')
    }
    const existingUser = await prisma.user.findUnique({
        where: {
            email
        }
    })
    if (!existingUser) {
        throw new NotFoundError('User with this email does not exist')
    }
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.passwordHash)
    if (!isPasswordCorrect) {
        throw new UnauthorizedError('Password is incorrect')
    }
    const token = jwt.sign({email}, process.env.JWT_SECRET!)
    const response = NextResponse.redirect(`${process.env.HOST}/`)
    response.cookies.set('token', token)
    return response
}
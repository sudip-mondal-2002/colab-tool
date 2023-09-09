import {NextRequest, NextResponse} from "next/server";
import bcrypt from 'bcrypt'
import prisma from "@/utils/prisma";
import jwt from 'jsonwebtoken'
import {BadRequestError} from "@/errors/BadRequestError";
export const POST = async (req: NextRequest) => {
    const body = await req.json()
    const {name, email, password} = body
    if (!name || !email || !password) {
        throw new BadRequestError('Please fill all fields')
    }
    const existingUser = await prisma.user.findUnique({
        where: {
            email
        }
    })
    if (existingUser) {
        throw new BadRequestError('User with this email already exists')
    }
    const passwordHash = await bcrypt.hash(password, 10)
    await prisma.user.create({
        data: {
            name,
            email,
            passwordHash
        }
    })
    const token = jwt.sign({email}, process.env.JWT_SECRET!)
    const response = NextResponse.json({})
    response.cookies.set('token', token)
    return response
}
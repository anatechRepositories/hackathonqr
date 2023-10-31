import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client"
import { getToken } from "next-auth/jwt";
import { z } from "zod";

interface Props {
    params: {
        id: string
    }
}

const schema = z.object({
    name: z.string(),
    email: z.string().email(),
    tsize: z.string(),
    guest1 : z.string().nullable(),
    guest1tshirt : z.string().nullable(),
    guest2 : z.string().nullable(),
    guest2tshirt : z.string().nullable(),
    guest3 : z.string().nullable(),
    guest3tshirt : z.string().nullable(),
})

export async function POST(request: NextRequest,  respose : NextResponse) {

    const body = await request.json();
    const validation = schema.safeParse(body);

    if (!validation.success) {
        return NextResponse.json(
            validation.error.errors,
            {
                status: 400
            }
        )
    }

    const newUser = await prisma.user.create({
        data: {
            name: body.name,
            email: body.email,
            hashedPassword: "",
            tsize : body.tsize,
            guest1 : body.guest1,
            guest1tshirt : body.guest1tshirt,
            guest2 : body.guest2,
            guest2tshirt : body.guest2tshirt,
            guest3 : body.guest3,
            guest3tshirt : body.guest3tshirt,
        }
    })

    if(newUser)
    {
            return NextResponse.json(
                {
                    newUser
                }
            )
    }
    else
    {
            return NextResponse.json(
                {
                    error : "Failed to register"
                },
                {
                    status: 400
                }
            )

    }


}
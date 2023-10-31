import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client"
import { getToken } from "next-auth/jwt";
import { z } from "zod";

interface Props {
    params: {
        email: string
    }
}
export async function POST(request: NextRequest, { params }: Props) {


        const user = await prisma.user.findUnique({
            where : {
                email : params.email
            }
        });

        if(user)
        {

            const userUpdate = await prisma.user.update({
                where : {
                    email : params.email
                },
                data : {
                    verified : true
                }
            })

            return NextResponse.json(
                {
                    userUpdate
                }
            )
        }

        return NextResponse.json(
            {
                error : "ERR"
            },
            {
                status : 400
            }
        )
    
}
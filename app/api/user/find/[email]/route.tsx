import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client"
import { getToken } from "next-auth/jwt";
import { z } from "zod";

interface Props {
    params: {
        email: string
    }
}
export async function GET(request: NextRequest, { params }: Props) {


        const user = await prisma.user.findUnique({
            where : {
                email : params.email
            }
        });



        if(user)
        {
            return NextResponse.json(
                {
                    user
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
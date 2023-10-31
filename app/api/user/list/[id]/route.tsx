import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client"
import { getToken } from "next-auth/jwt";
import { z } from "zod";

interface Props {
    params: {
        id: string
    }
}


export async function GET(request: NextRequest, { params }: Props) {

    if(params.id === "1")
    {
        const userList = await prisma.user.findMany();

        return NextResponse.json(
            {
                count : userList.length,
                userList
            }
        )
    }

    if(params.id === "2")
    {
        const userList = await prisma.user.findMany(
            {
                where : 
                {
                    verified : true
                }
            }
        );

        return NextResponse.json(
            {
                count : userList.length,
                userList,
            }
        )
    }

    if(params.id === "3")
    {

    }



}
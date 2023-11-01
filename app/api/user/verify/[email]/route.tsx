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



        if (user) {
            if (user.verified) {
                return NextResponse.json(
                    {
                      error: "Email is already verified",
                    },
                    {
                      status: 400,
                    }
                  );
            }
        
            const userUpdate = await prisma.user.update({
              where: {
                email: params.email,
              },
              data: {
                verified: true,
              },
            });
        
            return NextResponse.json({
              message: "Email successfully verified.",
              userUpdate,
            });
          }
        
          return NextResponse.json(
            {
              error: "User not found or invalid email.",
            },
            {
              status: 400,
            }
          );
        }
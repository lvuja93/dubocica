import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';

export async function POST(req: Request) {
  try {
    const { name, teamName, telephone } = await req.json();

    const post = await prisma.tournamentApplication.create({
      data: {
        name,
        teamName,
        telephone,
        allowed: false,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error: any) {
    console.error(' Prisma error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

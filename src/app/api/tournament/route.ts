import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

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

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const teamName = searchParams.get('teamName');
    const allowed = searchParams.get('allowed');

    const applications = await prisma.tournamentApplication.findMany({
      where: {
        ...(teamName ? { teamName } : {}),
        ...(allowed !== null ? { allowed: allowed === 'true' } : {}),
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(applications, { status: 200 });
  } catch (error: any) {
    console.error('Prisma error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

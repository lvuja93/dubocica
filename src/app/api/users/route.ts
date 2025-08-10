import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import {
  createUserPayload,
  usersListDto,
  userDto,
} from '@/shared/dto/user.dto';

export async function GET() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    take: 50,
    select: {
      id: true,
      publicId: true,
      email: true,
      name: true,
      bio: true,
      createdAt: true,
    },
  });
  const usersSerialized = users.map((u) => ({
    ...u,
    createdAt: u.createdAt.toISOString(),
  }));
  // (opciono) validacija izlaza
  const payload = usersListDto.parse({ usersSerialized });
  return NextResponse.json(payload, {
    status: 200,
    headers: { 'Cache-Control': 'no-store' },
  });
}

export async function POST(req: Request) {
  const json = await req.json();

  // validacija ulaza
  const parsed = createUserPayload.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );
  }

  try {
    const user = await prisma.user.create({
      data: parsed.data,
      select: {
        id: true,
        publicId: true,
        email: true,
        name: true,
        bio: true,
        createdAt: true,
      },
    });
    const userSerialized = { ...user, createdAt: user.createdAt.toISOString() };
    // (opciono) validacija izlaza
    const payload = { user: userDto.parse(userSerialized) };
    return NextResponse.json(payload, { status: 201 });
  } catch (e: any) {
    if (e?.code === 'P2002') {
      return NextResponse.json(
        { error: 'Email je već u upotrebi.' },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: 'Neuspelo kreiranje.' }, { status: 500 });
  }
}

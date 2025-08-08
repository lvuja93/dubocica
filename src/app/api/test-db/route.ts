import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // upišemo jednog usera
    await prisma.user.create({
      data: { email: 'test@example.com', name: 'Test User' },
    });

    // pročitamo sve usere
    const users = await prisma.user.findMany();
    return NextResponse.json({ success: true, users });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}

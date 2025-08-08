// app/api/test-db/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET() {
  try {
    const user = await prisma.user.upsert({
      where: { email: 'test@example.com' },
      update: {}, // ništa ne menja ako postoji
      create: { email: 'test@example.com', name: 'Test User' },
    });
    return NextResponse.json({ ok: true, user });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 });
  }
}

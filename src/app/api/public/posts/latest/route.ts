import { prisma } from '../../../../../../lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      where: { allowed: true },
      orderBy: { createdAt: 'desc' },
      take: 3,
    });

    return NextResponse.json(Array.isArray(posts) ? posts : []);
  } catch (error) {
    console.error('Error fetching latest posts:', error);
    return NextResponse.json([], { status: 200 });
  }
}

import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '../../../../lib/prisma';

export async function GET() {
  const session = await auth();

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const posts =
      session.user.role === 'ADMIN'
        ? await prisma.post.findMany({
            include: { author: true },
            orderBy: { createdAt: 'desc' },
          })
        : await prisma.post.findMany({
            where: { authorId: session.user.id },
            include: { author: true },
            orderBy: { createdAt: 'desc' },
          });

    return NextResponse.json(posts);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await auth();

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { title, images, allowed, mainText, excerpt } = await req.json();

    if (!title || !mainText) {
      return NextResponse.json(
        { error: 'Title and mainText are required' },
        { status: 400 }
      );
    }

    const post = await prisma.post.create({
      data: {
        title,
        images: Array.isArray(images) ? images : [],
        allowed: allowed ?? false,
        excerpt,
        mainText,
        authorId: session.user.id,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

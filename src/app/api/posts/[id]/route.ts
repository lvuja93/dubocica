import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '../../../../../lib/prisma';

interface Params {
  params: { id: string };
}

export async function GET(_: Request, { params }: Params) {
  try {
    const post = await prisma.post.findUnique({
      where: { id: params.id },
      include: { author: true },
    });

    if (!post)
      return NextResponse.json({ error: 'Not found' }, { status: 404 });

    return NextResponse.json(post);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: Params) {
  const session = await auth();

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const existing = await prisma.post.findUnique({ where: { id: params.id } });
    if (!existing)
      return NextResponse.json({ error: 'Not found' }, { status: 404 });

    if (
      session.user.role !== 'ADMIN' &&
      existing.authorId !== session.user.id
    ) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { title, images, allowed, mainText } = await req.json();

    const updated = await prisma.post.update({
      where: { id: params.id },
      data: {
        title: title ?? existing.title,
        images: images ?? existing.images,
        allowed: allowed ?? existing.allowed,
        mainText: mainText ?? existing.mainText,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: Params) {
  const session = await auth();

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const existing = await prisma.post.findUnique({ where: { id: params.id } });
    if (!existing)
      return NextResponse.json({ error: 'Not found' }, { status: 404 });

    if (
      session.user.role !== 'ADMIN' &&
      existing.authorId !== session.user.id
    ) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await prisma.post.delete({ where: { id: params.id } });

    return NextResponse.json({ message: 'Deleted' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

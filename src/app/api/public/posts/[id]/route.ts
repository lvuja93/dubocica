import { prisma } from '../../../../../../lib/prisma';
import { NextResponse, type NextRequest } from 'next/server';

export async function GET(_req: Request, context: any) {
  const id = context.params.id as string;

  try {
    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

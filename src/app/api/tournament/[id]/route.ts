import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';

export async function PATCH(req: Request, context: any) {
  const id = context.params.id as string;

  try {
    const { allowed } = await req.json();

    const updated = await prisma.tournamentApplication.update({
      where: { id },
      data: { allowed },
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error('Error updating application:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(_req: Request, context: any) {
  const id = context.params.id as string;

  try {
    const deleted = await prisma.tournamentApplication.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: 'Prijava obrisana', deleted },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting application:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { handleError } from '@/utils/error-handler/error-handler';

export const dynamic = 'force-dynamic';

export async function GET(
  _request: NextRequest,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;

  try {
    const user = await db.user.findUnique({ where: { id: userId } });

    if (!user) {
      return NextResponse.json(
        { success: false, message: `User not found` },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    handleError(error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;

  try {
    const user = await db.user.findUnique({ where: { id: userId } });

    if (!user) {
      return NextResponse.json(
        { success: false, message: `User not found` },
        { status: 404 }
      );
    }

    const requestBody = await request.json();
    const updatedUser = await db.user.update({
      data: requestBody,
      where: { id: userId },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    handleError(error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;

  try {
    const user = await db.user.findUnique({ where: { id: userId } });

    if (!user) {
      return NextResponse.json(
        { success: false, message: `User not found` },
        { status: 404 }
      );
    }

    await db.user.delete({
      where: { id: userId },
    });

    return NextResponse.json({ message: 'User deleted' });
  } catch (error) {
    handleError(error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

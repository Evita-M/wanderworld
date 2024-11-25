import db from '@/lib/db';
import { handleError } from '@/utils/errorHandler';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-static';

export async function GET(_request: NextRequest) {
  try {
    const users = await db.user.findMany();

    return NextResponse.json(users);
  } catch (error) {
    handleError(error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();

    const newUser = await db.user.create({
      data: requestBody,
    });

    return NextResponse.json(newUser);
  } catch (error) {
    handleError(error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

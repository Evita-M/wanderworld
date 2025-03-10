import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import {
  BaseResponse,
  getDuplicateResponse,
  getNotFoundResponse,
  getServerErrorResponse,
} from '@/utils/errorHandler';
import { Prisma } from '@prisma/client';

export const dynamic = 'force-dynamic';

type CreateGuideRequestBody = Omit<
  Prisma.GuideCreateInput,
  'id' | 'createdAt' | 'updatedAt'
> & {
  email: string;
};

async function getGuides(_request: NextRequest) {
  try {
    const guides = await db.guide.findMany();

    if (!guides) {
      return getNotFoundResponse('Guides');
    }

    return NextResponse.json(guides);
  } catch (error) {
    return getServerErrorResponse(error);
  }
}

async function createGuide(request: NextRequest) {
  try {
    const requestBody: CreateGuideRequestBody = await request.json();

    const existingGuide = await db.guide.findUnique({
      where: { email: requestBody.email },
    });

    if (existingGuide) {
      return getDuplicateResponse('Guide', 'email', requestBody.email);
    }

    await db.guide.create({
      data: requestBody,
    });
    return NextResponse.json<BaseResponse>({
      success: true,
      message: 'Guide created',
    });
  } catch (error) {
    return getServerErrorResponse(error);
  }
}
export { getGuides as GET, createGuide as POST };

import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import {
  BaseResponse,
  getDuplicateResponse,
  getNotFoundResponse,
  getServerErrorResponse,
} from '@/utils/errorHandler';
import { Guide, Prisma } from '@prisma/client';

export const dynamic = 'force-dynamic';

type GetGuideParams = {
  guideId: string;
};

type DeleteGuideParams = {
  guideId: string;
};

type GuideResponse = Guide;

type UpdateGuideParams = {
  guideId: string;
};

type UpdateGuideRequestBody = Partial<
  Omit<Prisma.GuideUpdateInput, 'id' | 'createdAt' | 'updatedAt'>
> & {
  email: string;
};

async function getGuide(
  _request: NextRequest,
  { params }: { params: GetGuideParams }
) {
  const { guideId } = params;

  try {
    const guide = await db.guide.findUnique({
      where: { id: guideId },
      include: { expeditions: true },
    });

    if (!guide) {
      return getNotFoundResponse('Guide');
    }

    return NextResponse.json<GuideResponse>(guide);
  } catch (error) {
    return getServerErrorResponse(error);
  }
}

async function updateGuide(
  request: NextRequest,
  { params }: { params: UpdateGuideParams }
) {
  const { guideId } = params;

  try {
    const guide = await db.guide.findUnique({
      where: { id: guideId },
    });

    if (!guide) {
      return getNotFoundResponse('Guide');
    }

    const requestBody: UpdateGuideRequestBody = await request.json();

    if (requestBody.email) {
      const emailExists = await db.guide.findUnique({
        where: { email: requestBody.email },
      });
      if (emailExists && emailExists.id !== guideId) {
        return getDuplicateResponse('Guide', 'email', requestBody.email);
      }
    }

    await db.guide.update({
      data: requestBody,
      where: { id: guideId },
    });

    return NextResponse.json<BaseResponse>({
      success: true,
      message: 'Guide updated successfully',
    });
  } catch (error) {
    return getServerErrorResponse(error);
  }
}

async function deleteGuide(
  _request: NextRequest,
  { params }: { params: DeleteGuideParams }
) {
  const { guideId } = params;

  try {
    const guide = await db.guide.findUnique({
      where: { id: guideId },
    });

    if (!guide) {
      return getNotFoundResponse('Guide');
    }
    await db.guide.delete({
      where: { id: guideId },
    });

    return NextResponse.json<BaseResponse>({
      success: true,
      message: 'Guide deleted',
    });
  } catch (error) {
    return getServerErrorResponse(error);
  }
}

export { getGuide as GET, updateGuide as PATCH, deleteGuide as DELETE };

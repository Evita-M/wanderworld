import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import {
  BaseResponse,
  ErrorResponse,
  getBadRequestResponse,
  getDuplicateResponse,
  getNotFoundResponse,
  getServerErrorResponse,
} from '@/utils/error-handler/error-handler';
import { RequestParams, GetGuidePayload, apiGuideSchema } from '../schema';

export const dynamic = 'force-dynamic';

async function getGuide(
  _request: NextRequest,
  { params }: { params: RequestParams }
): Promise<NextResponse<GetGuidePayload | ErrorResponse>> {
  const { guideId } = params;

  try {
    const guide = await db.guide.findUnique({
      where: { id: guideId },
      include: { expeditions: true, languages: true },
    });

    if (!guide) {
      return getNotFoundResponse('Guide');
    }

    return NextResponse.json<GetGuidePayload>(guide);
  } catch (error) {
    return getServerErrorResponse(error);
  }
}

async function updateGuide(
  request: NextRequest,
  { params }: { params: RequestParams }
) {
  const { guideId } = params;

  const validatedRequestBody = apiGuideSchema
    .partial()
    .safeParse(await request.json());

  if (!validatedRequestBody.success) {
    return getBadRequestResponse(validatedRequestBody.error);
  }

  const { languages, email, ...rest } = validatedRequestBody.data;

  try {
    const guide = await db.guide.findUnique({
      where: { id: guideId },
      include: { expeditions: true, languages: true },
    });

    if (!guide) {
      return getNotFoundResponse('Guide');
    }

    if (email) {
      const emailExists = await db.guide.findUnique({
        where: { email },
      });
      if (emailExists && emailExists.id !== guideId) {
        return getDuplicateResponse('Guide', 'email', email);
      }
    }

    await db.guide.update({
      data: {
        ...rest,
        languages: {
          connectOrCreate: languages?.map((l) => ({
            where: { code: l.code },
            create: l,
          })),
          disconnect: guide.languages
            .filter(
              (language) => !languages?.some((l) => l.code === language.code)
            )
            .map((language) => ({ code: language.code })),
        },
      },
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
  { params }: { params: RequestParams }
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

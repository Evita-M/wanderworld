import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import {
  BaseResponse,
  getBadRequestResponse,
  getDuplicateResponse,
  getNotFoundResponse,
  getServerErrorResponse,
} from '@/utils/error-handler/error-handler';
import { apiGuideSchema, GetGuidePayload } from './schema';

export const dynamic = 'force-dynamic';

async function getGuides(_request: NextRequest) {
  try {
    const guides = await db.guide.findMany({
      include: {
        expeditions: {
          include: {
            countries: true,
            languages: true,
            guide: {
              include: {
                languages: true,
              },
            },
          },
        },
        languages: true,
      },
    });

    if (!guides) {
      return getNotFoundResponse('Guides');
    }

    return NextResponse.json<GetGuidePayload[]>(guides);
  } catch (error) {
    return getServerErrorResponse(error);
  }
}

async function createGuide(request: NextRequest) {
  try {
    const validatedRequestBody = apiGuideSchema.safeParse(await request.json());

    if (!validatedRequestBody.success) {
      return getBadRequestResponse(validatedRequestBody.error);
    }

    const { languages, email, ...rest } = validatedRequestBody.data;

    const existingGuide = await db.guide.findUnique({
      where: { email: email },
    });

    if (existingGuide) {
      return getDuplicateResponse('Guide', 'email', email);
    }

    await db.guide.create({
      data: {
        ...rest,
        email,
        languages: {
          connectOrCreate: languages.map((l) => ({
            where: { code: l.code },
            create: l,
          })),
        },
      },
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

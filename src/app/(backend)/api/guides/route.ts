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
    const guides = await db.guide.findMany({
      include: {
        expeditions: true,
        languages: true,
      },
    });

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
    const requestBody = (await request.json()) as CreateGuideRequestBody & {
      languages: { code: string; name: string }[];
    };
    const { languages, ...rest } = requestBody;

    let existingLanguages: { code: string }[] = [];
    let newLanguages: { code: string; name: string }[] = [];

    if (languages) {
      // Fetch existing languages from the database
      existingLanguages = await db.language.findMany({
        where: {
          code: { in: languages.map((l: { code: string }) => l.code) },
        },
      });

      const existingLanguageCodes = existingLanguages.map(
        (l: { code: string }) => l.code
      );

      // Determine new languages to be created
      newLanguages = languages.filter(
        (l) => !existingLanguageCodes.includes(l.code)
      );
    }
    const existingGuide = await db.guide.findUnique({
      where: { email: requestBody.email },
    });

    if (existingGuide) {
      return getDuplicateResponse('Guide', 'email', requestBody.email);
    }

    await db.guide.create({
      data: {
        ...rest,
        languages: {
          create: newLanguages.map((l: { code: string; name: string }) => ({
            code: l.code,
            name: l.name,
          })),
          connect: existingLanguages.map((l: { code: string }) => ({
            code: l.code,
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

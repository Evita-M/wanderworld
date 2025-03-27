import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import {
  BaseResponse,
  getNotFoundResponse,
  getServerErrorResponse,
  getBadRequestResponse,
} from '@/utils/errorHandler';
import { Status } from '@prisma/client';
import { apiExpeditionSchema, ExpeditionPayload } from './schema';

export const dynamic = 'force-dynamic';

async function getExpeditions(_request: NextRequest) {
  try {
    const expeditions = await db.expedition.findMany({
      include: {
        countries: true,
        languages: true,
        guide: true,
      },
    });

    if (!expeditions) {
      return getNotFoundResponse('Expeditions');
    }

    return NextResponse.json<ExpeditionPayload[]>(expeditions);
  } catch (error) {
    return getServerErrorResponse(error);
  }
}

async function createExpedition(request: NextRequest) {
  try {
    const validatedRequestBody = apiExpeditionSchema.safeParse(
      await request.json()
    );

    if (!validatedRequestBody.success) {
      return getBadRequestResponse(validatedRequestBody.error);
    }

    const { countries, languages, guideId, ...rest } =
      validatedRequestBody.data;

    const status = guideId ? Status.FINALIZED : Status.PENDING;

    await db.expedition.create({
      data: {
        ...rest,
        countries: {
          connectOrCreate: countries.map((c) => ({
            where: { code: c.code },
            create: c,
          })),
        },
        languages: {
          connectOrCreate: languages.map((l) => ({
            where: { code: l.code },
            create: l,
          })),
        },
        guide: {
          connect: {
            id: guideId,
          },
        },
        status,
      },
    });

    return NextResponse.json<BaseResponse>({
      success: true,
      message: 'Expedition created',
    });
  } catch (error) {
    return getServerErrorResponse(error);
  }
}

export { getExpeditions as GET, createExpedition as POST };

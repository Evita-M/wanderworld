import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import {
  BaseResponse,
  getNotFoundResponse,
  getServerErrorResponse,
  getBadRequestResponse,
} from '@/utils/error-handler/error-handler';
import { Status } from '@prisma/client';
import { apiExpeditionSchema, GetExpeditionPayload } from './schema';

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

    return NextResponse.json<GetExpeditionPayload[]>(expeditions);
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

    const prismaData = {
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
      guide: guideId ? { connect: { id: guideId } } : undefined,
      status,
    };

    await db.expedition.create({
      data: prismaData,
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

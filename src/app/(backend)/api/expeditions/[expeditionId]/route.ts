import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import {
  BaseResponse,
  ErrorResponse,
  getBadRequestResponse,
  getNotFoundResponse,
  getServerErrorResponse,
} from '@/utils/error-handler/error-handler';
import { Status } from '@prisma/client';
import { apiExpeditionSchema, Expedition, RequestParams } from '../schema';

export const dynamic = 'force-dynamic';

async function getExpedition(
  _request: NextRequest,
  { params }: { params: RequestParams }
): Promise<NextResponse<Expedition | ErrorResponse>> {
  const { expeditionId } = params;

  try {
    const expedition = await db.expedition.findUnique({
      where: { id: expeditionId },
      include: {
        countries: true,
        languages: true,
        guide: true,
      },
    });

    if (!expedition) {
      return getNotFoundResponse('Expedition');
    }

    return NextResponse.json<Expedition>(expedition);
  } catch (error) {
    return getServerErrorResponse(error);
  }
}

async function updateExpedition(
  request: NextRequest,
  { params }: { params: RequestParams }
) {
  const { expeditionId } = params;

  const validatedRequestBody = apiExpeditionSchema
    .partial()
    .safeParse(await request.json());

  if (!validatedRequestBody.success) {
    return getBadRequestResponse(validatedRequestBody.error);
  }

  const { countries, languages, guideId, ...rest } = validatedRequestBody.data;

  try {
    const expedition = await db.expedition.findUnique({
      where: { id: expeditionId },
      include: {
        countries: true,
        languages: true,
      },
    });

    if (!expedition) {
      return getNotFoundResponse('Expedition');
    }

    const status = guideId ? Status.FINALIZED : Status.PENDING;

    await db.expedition.update({
      data: {
        ...rest,
        countries: {
          connectOrCreate: countries?.map((c) => ({
            where: { code: c.code },
            create: c,
          })),
          disconnect: expedition.countries
            .filter(
              (country) => !countries?.some((c) => c.code === country.code)
            )
            .map((country) => ({ code: country.code })),
        },
        languages: {
          connectOrCreate: languages?.map((l) => ({
            where: { code: l.code },
            create: l,
          })),
          disconnect: expedition.languages
            .filter(
              (language) => !languages?.some((l) => l.code === language.code)
            )
            .map((language) => ({ code: language.code })),
        },
        ...(guideId && {
          guide: {
            connect: {
              id: guideId,
            },
          },
        }),
        status,
      },
      where: { id: expeditionId },
    });

    return NextResponse.json<BaseResponse>({
      success: true,
      message: 'Expedition updated successfully',
    });
  } catch (error) {
    return getServerErrorResponse(error);
  }
}

async function deleteExpedition(
  _request: NextRequest,
  { params }: { params: RequestParams }
) {
  const { expeditionId } = params;

  try {
    const expedition = await db.expedition.findUnique({
      where: { id: expeditionId },
    });

    if (!expedition) {
      getNotFoundResponse('Expedition');
    }

    await db.expedition.delete({
      where: { id: expeditionId },
    });

    return NextResponse.json<BaseResponse>({
      success: true,
      message: 'Expedition deleted successfully',
    });
  } catch (error) {
    return getServerErrorResponse(error);
  }
}

export {
  getExpedition as GET,
  updateExpedition as PATCH,
  deleteExpedition as DELETE,
};

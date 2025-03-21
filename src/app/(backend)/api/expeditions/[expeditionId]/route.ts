import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import {
  BaseResponse,
  ErrorResponse,
  getNotFoundResponse,
  getServerErrorResponse,
} from '@/utils/errorHandler';
import { Expedition, Prisma } from '@prisma/client';

export const dynamic = 'force-dynamic';

type GetExpeditionParams = {
  expeditionId: string;
};
type DeleteExpeditionParams = {
  expeditionId: string;
};

type ExpeditionResponse = Expedition;

type UpdateExpeditionParams = {
  expeditionId: string;
};

type UpdateExpeditionRequestBody = Partial<
  Omit<Prisma.ExpeditionUpdateInput, 'id' | 'createdAt' | 'updatedAt'>
>;

async function getExpedition(
  _request: NextRequest,
  { params }: { params: GetExpeditionParams }
): Promise<NextResponse<ExpeditionResponse | ErrorResponse>> {
  const { expeditionId } = params;

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

    return NextResponse.json<ExpeditionResponse>(expedition);
  } catch (error) {
    return getServerErrorResponse(error);
  }
}

async function updateExpedition(
  request: NextRequest,
  { params }: { params: UpdateExpeditionParams }
) {
  const { expeditionId } = params;

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

    const requestBody =
      (await request.json()) as UpdateExpeditionRequestBody & {
        countries: { code: string; name: string }[];
        languages: { code: string; name: string }[];
      };

    const { countries, languages, ...rest } = requestBody;

    // Fetch existing countries and languages from the database
    const existingCountries = await db.country.findMany({
      where: { code: { in: countries.map((c) => c.code) } },
    });

    const existingCountryCodes = existingCountries.map((c) => c.code);

    const newCountries = countries.filter(
      (c) => !existingCountryCodes.includes(c.code)
    );

    const existingLanguages = await db.language.findMany({
      where: { code: { in: languages.map((l) => l.code) } },
    });

    const existingLanguageCodes = existingLanguages.map((l) => l.code);

    const newLanguages = languages.filter(
      (l) => !existingLanguageCodes.includes(l.code)
    );

    // Prepare the update data
    const updateData = {
      ...rest,
      countries: {
        create: newCountries.map((c) => ({
          code: c.code,
          name: c.name,
        })),
        connect: existingCountries.map((c) => ({
          code: c.code,
        })),
        disconnect: expedition.countries
          .filter((country) => !countries.some((c) => c.code === country.code))
          .map((country) => ({ code: country.code })),
      },
      languages: {
        create: newLanguages.map((l) => ({
          code: l.code,
          name: l.name,
        })),
        connect: existingLanguages.map((l) => ({
          code: l.code,
        })),
        disconnect: expedition.languages
          .filter(
            (language) => !languages.some((l) => l.code === language.code)
          )
          .map((language) => ({ code: language.code })),
      },
    };

    await db.expedition.update({
      data: updateData,
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
  { params }: { params: DeleteExpeditionParams }
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
      message: 'Expedition updated successfully',
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

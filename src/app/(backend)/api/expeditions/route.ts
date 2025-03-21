import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import {
  BaseResponse,
  getNotFoundResponse,
  getServerErrorResponse,
} from '@/utils/errorHandler';
import { Prisma, Status } from '@prisma/client';

export const dynamic = 'force-dynamic';

export type CreateExpeditionRequestBody = Omit<
  Prisma.ExpeditionCreateInput,
  'id' | 'createdAt' | 'updatedAt'
>;

async function getExpeditions(_request: NextRequest) {
  try {
    const expeditions = await db.expedition.findMany({
      include: {
        countries: true,
        languages: true,
      },
    });

    if (!expeditions) {
      return getNotFoundResponse('Expeditions');
    }

    return NextResponse.json(expeditions);
  } catch (error) {
    return getServerErrorResponse(error);
  }
}

async function createExpedition(request: NextRequest) {
  try {
    const requestBody =
      (await request.json()) as CreateExpeditionRequestBody & {
        countries: { code: string; name: string }[];
        languages: { code: string; name: string }[];
      };

    const { countries, languages, ...rest } = requestBody;

    const status = requestBody.guide ? Status.FINALIZED : Status.PENDING;

    if (countries) {
      // Fetch existing countries from the database
      const existingCountries = await db.country.findMany({
        where: { code: { in: countries.map((c: { code: string }) => c.code) } },
      });

      const existingCountryCodes = existingCountries.map(
        (c: { code: string }) => c.code
      );

      // Determine new countries to be created
      const newCountries = countries.filter(
        (c) => !existingCountryCodes.includes(c.code)
      );

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

      await db.expedition.create({
        data: {
          ...rest,
          countries: {
            create: newCountries.map((c: { code: string; name: string }) => ({
              code: c.code,
              name: c.name,
            })),
            connect: existingCountries.map((c: { code: string }) => ({
              code: c.code,
            })),
          },
          languages: {
            create: newLanguages.map((l: { code: string; name: string }) => ({
              code: l.code,
              name: l.name,
            })),
            connect: existingLanguages.map((l: { code: string }) => ({
              code: l.code,
            })),
          },
          status,
        },
      });

      return NextResponse.json<BaseResponse>({
        success: true,
        message: 'Expedition created',
      });
    }

    return getServerErrorResponse(new Error('No countries provided'));
  } catch (error) {
    return getServerErrorResponse(error);
  }
}

export { getExpeditions as GET, createExpedition as POST };

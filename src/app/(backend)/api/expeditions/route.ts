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
      include: { participants: true, guide: true },
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
    const requestBody: CreateExpeditionRequestBody = await request.json();

    const status = requestBody.guide ? Status.FINALIZED : Status.PENDING;

    await db.expedition.create({
      data: { ...requestBody, status },
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

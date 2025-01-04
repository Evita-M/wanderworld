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
    });

    if (!expedition) {
      return getNotFoundResponse('Expedition');
    }

    return NextResponse.json<ExpeditionResponse>(expedition);
  } catch (error) {
    return getServerErrorResponse(error);
  }
}

async function updatedExpedition(
  request: NextRequest,
  { params }: { params: UpdateExpeditionParams }
) {
  const { expeditionId } = params;

  try {
    const expedition = await db.expedition.findUnique({
      where: { id: expeditionId },
    });

    if (!expedition) {
      return getNotFoundResponse('Expedition');
    }

    const requestBody: UpdateExpeditionRequestBody = await request.json();

    await db.expedition.update({
      data: requestBody,
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
  updatedExpedition as PATCH,
  deleteExpedition as DELETE,
};

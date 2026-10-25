export const runtime = 'edge';

import type { NextRequest, NextResponse } from 'next/server';
import type { Group } from '@/types/group';
import { findGroupByStudentIndex } from '@/utils/get-group-info';
import { respondWithItem } from '@/utils/respond-with-item';

export const GET = async (
    _req: NextRequest,
    { params: { studentIndex } }: { params: { studentIndex: string } }
): Promise<NextResponse> =>
    respondWithItem<Group>(process.env.OR_GROUPS, (groups) =>
        findGroupByStudentIndex(groups, studentIndex)
    );

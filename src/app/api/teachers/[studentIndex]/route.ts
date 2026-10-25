export const runtime = 'edge';

import type { NextRequest, NextResponse } from 'next/server';
import type { Teacher } from '@/types/teacher';
import { findTeacherByStudentIndex } from '@/utils/get-teacher-info';
import { respondWithItem } from '@/utils/respond-with-item';

export const GET = async (
    _req: NextRequest,
    { params: { studentIndex } }: { params: { studentIndex: string } }
): Promise<NextResponse> =>
    respondWithItem<Teacher>(process.env.OR_TEACHERS, (teachers) =>
        findTeacherByStudentIndex(teachers, studentIndex)
    );

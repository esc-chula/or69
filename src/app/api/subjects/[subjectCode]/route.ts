export const runtime = 'edge';

import type { NextRequest, NextResponse } from 'next/server';
import type { Subject } from '@/types/subject';
import { findSubjectByCode } from '@/utils/get-subject-info';
import { respondWithItem } from '@/utils/respond-with-item';

export const GET = async (
    _req: NextRequest,
    { params: { subjectCode } }: { params: { subjectCode: string } }
): Promise<NextResponse> =>
    respondWithItem<Subject>(process.env.OR_SUBJECTS, (subjects) =>
        findSubjectByCode(subjects, subjectCode)
    );

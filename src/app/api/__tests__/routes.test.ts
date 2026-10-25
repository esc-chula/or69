// @vitest-environment node
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { NextRequest } from 'next/server';
import type { Group } from '@/types/group';
import type { Subject } from '@/types/subject';
import type { Teacher } from '@/types/teacher';
import { GET as getGroup } from '../groups/[studentIndex]/route';
import { GET as getSubject } from '../subjects/[subjectCode]/route';
import { GET as getTeacher } from '../teachers/[studentIndex]/route';

const groups: Group[] = [
    {
        index: '1',
        groupCode: '2198374',
        range: { start: 1, end: 99 },
        subjects: [{ code: '2199001', section: 1 }],
    },
    {
        index: '2',
        groupCode: '2198375',
        range: { start: 100, end: 199 },
        subjects: [{ code: '2199001', section: 2 }],
    },
];

const teachers: Teacher[] = [
    {
        index: '1',
        range: { start: 1, end: 50 },
        name: 'รศ.ดร.อาจารย์ ที่ดี',
        room: 'ห้อง 123 ตึก 3',
        program: 'วิศวกรรมคอมพิวเตอร์',
    },
    {
        index: '2',
        range: { start: 51, end: 100 },
        name: 'ผศ.ดร.สุดยอด ไปเลย',
        room: 'ห้อง 321 ตึก 1',
        program: 'วิศวกรรมโยธา',
    },
];

const subjects: Subject[] = [
    {
        index: '1',
        code: '2199001',
        name: 'Mathematics I',
        midterm: '-',
        final: '-',
        sections: [{ section: 1, classes: [] }],
    },
    {
        index: '2',
        code: '2199001',
        name: 'Mathematics I',
        midterm: '-',
        final: '-',
        sections: [{ section: 2, classes: [] }],
    },
    {
        index: '3',
        code: '2109101',
        name: 'Engineering Drawing',
        midterm: '-',
        final: '-',
        sections: [{ section: 1, classes: [] }],
    },
];

const upstream: Record<string, unknown> = {
    'https://data.test/groups': groups,
    'https://data.test/teachers': teachers,
    'https://data.test/subjects': subjects,
};

const request = (path: string): NextRequest =>
    new NextRequest(`http://localhost${path}`);

describe('data API routes', () => {
    beforeEach(() => {
        vi.stubEnv('OR_GROUPS', 'https://data.test/groups');
        vi.stubEnv('OR_TEACHERS', 'https://data.test/teachers');
        vi.stubEnv('OR_SUBJECTS', 'https://data.test/subjects');
        vi.stubGlobal(
            'fetch',
            vi.fn(async (url: string) =>
                url in upstream
                    ? new Response(JSON.stringify(upstream[url]))
                    : new Response(null, { status: 404 })
            )
        );
    });

    afterEach(() => {
        vi.unstubAllEnvs();
        vi.unstubAllGlobals();
    });

    test('GET /api/groups/[studentIndex] returns only the matching group from OR_GROUPS', async () => {
        const res = await getGroup(request('/api/groups/150'), {
            params: { studentIndex: '150' },
        });

        expect(res.status).toBe(200);
        expect(await res.json()).toEqual(groups[1]);
    });

    test('GET /api/teachers/[studentIndex] returns only the matching teacher from OR_TEACHERS', async () => {
        const res = await getTeacher(request('/api/teachers/75'), {
            params: { studentIndex: '75' },
        });

        expect(res.status).toBe(200);
        expect(await res.json()).toEqual(teachers[1]);
    });

    test('GET /api/subjects/[subjectCode] returns only the matching subject from OR_SUBJECTS', async () => {
        const res = await getSubject(request('/api/subjects/2199001'), {
            params: { subjectCode: '2199001' },
        });

        expect(res.status).toBe(200);
        expect(await res.json()).toEqual({
            ...subjects[0],
            sections: [subjects[0].sections[0], subjects[1].sections[0]],
        });
    });

    test('responds 404 with the lookup error when nothing matches', async () => {
        const res = await getGroup(request('/api/groups/3999'), {
            params: { studentIndex: '3999' },
        });

        expect(res.status).toBe(404);
        expect(await res.json()).toEqual({ error: 'Group not found' });
    });

    test('responds 404 when the data URL is not configured', async () => {
        vi.stubEnv('OR_TEACHERS', '');

        const res = await getTeacher(request('/api/teachers/75'), {
            params: { studentIndex: '75' },
        });

        expect(res.status).toBe(404);
        expect(fetch).not.toHaveBeenCalled();
    });
});

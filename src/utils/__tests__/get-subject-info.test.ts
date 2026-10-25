import { afterEach, describe, expect, test, vi } from 'vitest';
import type { Subject } from '@/types/subject';
import { cohort } from '@/config/cohort';
import {
    findSubjectByCode,
    getExpEngSectionByStudentIndex,
    getSubjectsInfo,
} from '../get-subject-info';
import { fetcher } from '../data-fetcher';

const subjects: Subject[] = [
    {
        index: '1',
        code: '2199001',
        name: 'Mathematics I',
        lectureCredit: 3,
        midterm: '3 กรกฎาคม 2564',
        final: '4 กรกฎาคม 2564',
        sections: [
            {
                section: 1,
                studentStart: 1,
                studentEnd: 30,
                classes: [
                    {
                        format: 'Lecture',
                        day: 'Monday',
                        timeStart: '08:00',
                        timeEnd: '10:00',
                        location: 'บ้าน',
                    },
                ],
            },
        ],
    },
    {
        index: '2',
        code: '2109101',
        name: 'Engineering Drawing',
        labCredit: 1,
        midterm: '-',
        final: '-',
        sections: [
            {
                section: 1,
                classes: [
                    {
                        format: 'Lab',
                        day: 'Tuesday',
                        timeStart: '09:00',
                        timeEnd: '12:00',
                        location: 'ENG4 201',
                    },
                ],
            },
        ],
    },
    {
        index: '3',
        code: '2109101',
        name: 'Engineering Drawing',
        labCredit: 1,
        midterm: '-',
        final: '-',
        sections: [
            {
                section: 2,
                classes: [
                    {
                        format: 'Lab',
                        day: 'Thursday',
                        timeStart: '13:00',
                        timeEnd: '16:00',
                        location: 'ENG4 202',
                    },
                ],
            },
        ],
    },
];

const expEng: Subject = {
    index: '4',
    sections: [
        {
            section: 1,
            classes: [
                {
                    format: 'บ/ป',
                    day: 'พุธ',
                    timeStart: '13:00',
                    timeEnd: '16:00',
                    location: 'ENG3 319',
                },
            ],
            studentStart: 1,
            studentEnd: 10,
        },
    ],
    // follows the current semester's EXP ENG subject
    code: cohort.expEngSubjectCode,
    name: cohort.expEngSubjectName,
    lectureCredit: 2,
    midterm: '25 ก.ย. 66 เวลา 08:30-10:30 น.',
    final: '27 พ.ย.66 เวลา 08:30-10:30 น.',
};

vi.mock('../data-fetcher');

describe('findSubjectByCode', () => {
    test('returns a subject', () => {
        expect(findSubjectByCode(subjects, '2199001')).toEqual(subjects[0]);
    });

    test('merges the sections of rows that share a code', () => {
        expect(findSubjectByCode(subjects, '2109101')).toEqual({
            ...subjects[1],
            sections: [subjects[1].sections[0], subjects[2].sections[0]],
        });
    });

    test('throws an error if the subject code is invalid', () => {
        expect(() => findSubjectByCode(subjects, 'abc')).toThrow(
            'Invalid subject code'
        );
    });

    test('throws an error if the subject is not found', () => {
        expect(() => findSubjectByCode(subjects, '9999999')).toThrow(
            'Subject not found'
        );
    });
});

describe('getSubjectInfo', () => {
    afterEach(() => {
        vi.resetAllMocks();
    });

    test('fetches the subject from the subjects API route', async () => {
        vi.mocked(fetcher).mockResolvedValueOnce(subjects[0]);

        await expect(getSubjectsInfo('2199001')).resolves.toEqual(subjects[0]);
        expect(fetcher).toHaveBeenCalledWith('/api/subjects/2199001');
    });

    test('throws an error if the subject code is invalid', async () => {
        await expect(getSubjectsInfo('abc')).rejects.toThrow(
            'Invalid subject code'
        );
        expect(fetcher).not.toHaveBeenCalled();
    });
});

describe('getExpEngSectionByStudentIndex', () => {
    afterEach(() => {
        vi.resetAllMocks();
    });

    test('returns a section', async () => {
        vi.mocked(fetcher).mockResolvedValueOnce(expEng);

        const section = await getExpEngSectionByStudentIndex('1');
        expect(section).toEqual(expEng.sections[0]);
        expect(fetcher).toHaveBeenCalledWith(
            `/api/subjects/${cohort.expEngSubjectCode}`
        );
    });

    test('throws an error if the section is not found', async () => {
        vi.mocked(fetcher).mockResolvedValueOnce(expEng);

        await expect(getExpEngSectionByStudentIndex('11')).rejects.toThrow(
            'Section not found'
        );
    });
});

import { afterEach, describe, expect, test, vi } from 'vitest';
import type { Student } from '@/types/student';
import { getStudentInfo } from '../get-student-info';
import { fetcher } from '../data-fetcher';

const student: Student = {
    index: '1',
    id: '6931000021',
    name: {
        th: 'นายสุขี  ชีวัน',
        en: 'Mr. Sukee  Cheewan',
    },
    program: 'วิศวกรรมคอมพิวเตอร์-โอลิมปิกวิชาการ',
};

vi.mock('../data-fetcher');

vi.mock('@/config/cohort', async (importOriginal) => {
    const { cohort } = await importOriginal<typeof import('@/config/cohort')>();
    return {
        cohort: {
            ...cohort,
            studentIdPrefixes: ['693'],
            studentIdSuffix: '21',
        },
    };
});

describe('getStudentInfo function', () => {
    afterEach(() => {
        vi.resetAllMocks();
    });

    test('Get student data with a valid student ID', async () => {
        // /api/students/[studentId] returns a single student, not the roster
        vi.mocked(fetcher).mockResolvedValueOnce(student);

        await expect(getStudentInfo('6931000021')).resolves.toEqual(student);
        expect(fetcher).toHaveBeenCalledWith('/api/students/6931000021');
    });

    test('Error from an invalid student ID format [not a string number]', async () => {
        await expect(() => getStudentInfo('abc')).rejects.toThrow(
            'Invalid student ID format'
        );
        expect(fetcher).not.toHaveBeenCalled();
    });

    test('Error from an invalid student ID format [length != 10]', async () => {
        await expect(() => getStudentInfo('12345')).rejects.toThrow(
            'Invalid student ID format'
        );
        expect(fetcher).not.toHaveBeenCalled();
    });

    test('Error from a non-existent student ID', async () => {
        // the API route answers 404 for an unknown ID, and the fetcher throws on 404
        vi.mocked(fetcher).mockRejectedValueOnce(new Error('Data not found'));

        await expect(() => getStudentInfo('6939999921')).rejects.toThrow(
            'Data not found'
        );
    });
});

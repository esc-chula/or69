import { afterEach, describe, expect, test, vi } from 'vitest';
import type { Teacher } from '@/types/teacher';
import { findTeacherByStudentIndex, getTeacherInfo } from '../get-teacher-info';
import { fetcher } from '../data-fetcher';

const teachers: Teacher[] = [
    {
        index: '1',
        range: { start: 33, end: 65 },
        name: 'รศ.ดร.อาจารย์ ที่ดี',
        room: 'ห้อง 123 ตึก 3',
        program: 'วิศวกรรมคอมพิวเตอร์-โอลิมปิกวิชาการ',
        email: 'Ajarn@Teedee.com',
    },
    {
        index: '2',
        range: { start: 4, end: 6 },
        name: 'ผศ.ดร.สุดยอด ไปเลย',
        room: 'ห้อง 321 ตึก 1',
        program: 'วิศวกรรมคอมพิวเตอร์และเทคโนโลยีดิจิทัล',
        email: 'Sudyod@Pailoei.com',
    },
];

vi.mock('../data-fetcher');

describe('findTeacherByStudentIndex', () => {
    test('Get teacher data with a valid student index [length = 1]', () => {
        expect(findTeacherByStudentIndex(teachers, '5')).toEqual(teachers[1]);
    });

    test('Get teacher data with a valid student index [length = 2]', () => {
        expect(findTeacherByStudentIndex(teachers, '48')).toEqual(teachers[0]);
    });

    test('Error from a student index outside every range', () => {
        expect(() => findTeacherByStudentIndex(teachers, '100')).toThrow(
            'Teacher not found'
        );
    });

    test('Error from an invalid student index format [trailing letters]', () => {
        // '5abc' would otherwise convert to NaN and fall through to 'Teacher not found'
        expect(() => findTeacherByStudentIndex(teachers, '5abc')).toThrow(
            'Invalid student index'
        );
    });
});

describe('getTeacherInfo function', () => {
    afterEach(() => {
        vi.resetAllMocks();
    });

    test('Fetches the teacher from the teachers API route', async () => {
        vi.mocked(fetcher).mockResolvedValueOnce(teachers[1]);

        await expect(getTeacherInfo('5')).resolves.toEqual(teachers[1]);
        expect(fetcher).toHaveBeenCalledWith('/api/teachers/5');
    });

    test('Error from an invalid student index format [not a string number]', async () => {
        await expect(() => getTeacherInfo('abc')).rejects.toThrow(
            'Invalid student index'
        );
        expect(fetcher).not.toHaveBeenCalled();
    });

    test('Error from an invalid student index format [length > 4]', async () => {
        await expect(() => getTeacherInfo('12345')).rejects.toThrow(
            'Invalid student index'
        );
        expect(fetcher).not.toHaveBeenCalled();
    });
});

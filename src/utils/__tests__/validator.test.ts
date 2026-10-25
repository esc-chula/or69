import { describe, expect, test, vi } from 'vitest';
import { validateStudentId } from '../validator';

vi.mock('@/config/cohort', async (importOriginal) => {
    const { cohort } = await importOriginal<typeof import('@/config/cohort')>();
    return {
        cohort: {
            ...cohort,
            studentIdPrefixes: ['693', '68301555'],
            studentIdSuffix: '21',
        },
    };
});

describe('validateStudentId', () => {
    test.each([
        ['6931234521', true],
        // a full-length prefix pins exactly one student
        ['6830155521', true],
        ['683015551234521', false],
        ['6830155621', false],
        ['6631234521', false],
        ['6931234522', false],
        ['69312345621', false],
        ['693123421', false],
    ])('%s -> %s', (studentId, expected) => {
        expect(validateStudentId(studentId)).toBe(expected);
    });
});

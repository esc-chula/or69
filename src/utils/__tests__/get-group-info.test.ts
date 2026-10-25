import { afterEach, describe, expect, test, vi } from 'vitest';
import type { Group } from '@/types/group';
import { fetcher } from '../data-fetcher';
import { findGroupByStudentIndex, getGroupInfo } from '../get-group-info';

const groups: Group[] = [
    {
        index: '4',
        groupCode: '2198374',
        range: { start: 1, end: 99 },
        subjects: [
            {
                code: '2199001',
                section: 1,
            },
        ],
    },
    {
        index: '5',
        groupCode: '2198375',
        range: { start: 100, end: 199 },
        subjects: [
            {
                code: '2199001',
                section: 2,
            },
        ],
    },
];

vi.mock('../data-fetcher');

describe('findGroupByStudentIndex', () => {
    test('returns the group whose range covers the student index', () => {
        expect(findGroupByStudentIndex(groups, '99')).toEqual(groups[0]);
        expect(findGroupByStudentIndex(groups, '100')).toEqual(groups[1]);
    });

    test('throws an error if the group is not found', () => {
        expect(() => findGroupByStudentIndex(groups, '3999')).toThrow(
            'Group not found'
        );
    });

    test('throws an error if the student index is invalid', () => {
        // '5abc' would otherwise parse as 5
        expect(() => findGroupByStudentIndex(groups, '5abc')).toThrow(
            'Invalid student index'
        );
    });
});

describe('getGroupInfo', () => {
    afterEach(() => {
        vi.resetAllMocks();
    });

    test('throws an error if the student index is invalid', async () => {
        await expect(getGroupInfo('0')).rejects.toThrow(
            'Invalid student index'
        );

        await expect(getGroupInfo('abc')).rejects.toThrow(
            'Invalid student index'
        );

        await expect(getGroupInfo('-2993')).rejects.toThrow(
            'Invalid student index'
        );

        await expect(getGroupInfo('100000000')).rejects.toThrow(
            'Invalid student index'
        );

        expect(fetcher).not.toHaveBeenCalled();
    });

    test('fetches the group from the groups API route', async () => {
        vi.mocked(fetcher).mockResolvedValueOnce(groups[0]);

        await expect(getGroupInfo('99')).resolves.toEqual(groups[0]);
        expect(fetcher).toHaveBeenCalledWith('/api/groups/99');
    });
});

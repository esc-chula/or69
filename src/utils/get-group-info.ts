import type { Group } from '@/types/group';
import { fetcher } from './data-fetcher';
import { validateStudentIndex } from './validator';

// runs on the server in /api/groups/[studentIndex]
export const findGroupByStudentIndex = (
    groups: Group[],
    studentIndex: string
): Group => {
    if (!validateStudentIndex(studentIndex)) {
        throw new Error('Invalid student index');
    }

    const groupInfo = groups.find(
        (group: Group) =>
            group.range.start <= parseInt(studentIndex) &&
            group.range.end >= parseInt(studentIndex)
    );
    if (!groupInfo) {
        throw new Error('Group not found');
    }

    return groupInfo;
};

export const getGroupInfo = async (studentIndex: string): Promise<Group> => {
    if (!validateStudentIndex(studentIndex)) {
        throw new Error('Invalid student index');
    }

    const groupInfo = await fetcher<Group>(`/api/groups/${studentIndex}`);

    return groupInfo;
};

import type { Teacher } from '@/types/teacher';
import { fetcher } from './data-fetcher';
import { validateStudentIndex } from './validator';

// runs on the server in /api/teachers/[studentIndex]
export const findTeacherByStudentIndex = (
    teachers: Teacher[],
    studentIndex: string
): Teacher => {
    if (!validateStudentIndex(studentIndex)) {
        throw new Error('Invalid student index');
    }

    const teacherData = teachers.find(
        (teacher: Teacher) =>
            teacher.range.start <= Number(studentIndex) &&
            teacher.range.end >= Number(studentIndex)
    );

    if (!teacherData) {
        throw new Error('Teacher not found');
    }

    return teacherData;
};

export const getTeacherInfo = async (
    studentIndex: string
): Promise<Teacher> => {
    if (!validateStudentIndex(studentIndex)) {
        throw new Error('Invalid student index');
    }

    const teacherData = await fetcher<Teacher>(`/api/teachers/${studentIndex}`);

    return teacherData;
};

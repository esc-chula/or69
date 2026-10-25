import type { Section, Subject } from '@/types/subject';
import { cohort } from '@/config/cohort';
import { fetcher } from './data-fetcher';
import { validateSubjectCode } from './validator';

// runs on the server in /api/subjects/[subjectCode]
export const findSubjectByCode = (
    subjects: Subject[],
    subjectCode: string
): Subject => {
    if (!validateSubjectCode(subjectCode)) {
        throw new Error('Invalid subject code');
    }

    const subject = subjects.find((s) => s.code === subjectCode);
    if (!subject) {
        throw new Error('Subject not found');
    }

    const sections = subjects.filter((s) => s.code === subjectCode);

    if (sections.length > 1) {
        // merge sections
        const mergedSections = sections.reduce<Section[]>((acc, curr) => {
            return acc.concat(curr.sections);
        }, []);

        return {
            ...subject,
            sections: mergedSections,
        };
    }

    return subject;
};

export const getSubjectsInfo = async (
    subjectCode: string
): Promise<Subject> => {
    if (!validateSubjectCode(subjectCode)) {
        throw new Error('Invalid subject code');
    }

    const subject = await fetcher<Subject>(`/api/subjects/${subjectCode}`);

    return subject;
};

export const getExpEngSectionByStudentIndex = async (
    studentIndex: string
): Promise<Section> => {
    const expEng = await getSubjectsInfo(cohort.expEngSubjectCode);

    const found = expEng.sections.find((s) => {
        if (s.studentStart === undefined || s.studentEnd === undefined) {
            return false;
        }

        return (
            s.studentStart <= parseInt(studentIndex) &&
            parseInt(studentIndex) <= s.studentEnd
        );
    });

    if (!found) {
        throw new Error('Section not found');
    }

    return found;
};

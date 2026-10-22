import { cohort } from '@/config/cohort';

export const validateStudentId = (studentId: string): boolean => {
    // any of the whitelisted prefixes, then any digit exactly 5 times, then the suffix
    const prefixes = cohort.studentIdPrefixes.join('|');
    const pattern = new RegExp(
        `^(?:${prefixes})\\d{5}${cohort.studentIdSuffix}$`
    );
    return pattern.test(studentId);
};

export const validateStudentIndex = (studentIndex: string): boolean => {
    // starts with any digit from 1-9, then any digit 0-3 times
    const pattern = /^[1-9][0-9]{0,3}$/;
    return pattern.test(studentIndex);
};

export const validateSubjectCode = (subjectCode: string): boolean => {
    // any digit exactly 7 times
    const pattern = /^[0-9]{7}$/;
    return pattern.test(subjectCode);
};

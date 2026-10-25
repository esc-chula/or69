import { cohort } from '@/config/cohort';

const STUDENT_ID_LENGTH = 10;

export const validateStudentId = (studentId: string): boolean => {
    // any of the whitelisted prefixes, then enough digits to make 10 in total, then the suffix
    const prefixes = cohort.studentIdPrefixes
        .map((prefix) => {
            const digits =
                STUDENT_ID_LENGTH -
                prefix.length -
                cohort.studentIdSuffix.length;
            return `${prefix}\\d{${digits}}`;
        })
        .join('|');
    const pattern = new RegExp(`^(?:${prefixes})${cohort.studentIdSuffix}$`);
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

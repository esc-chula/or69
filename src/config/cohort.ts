const EXP_ENG_SUBJECTS = {
    1: { code: '5500111', name: 'EXP ENG I' },
    2: { code: '5500112', name: 'EXP ENG II' },
} as const;

const SHOW_GROUP_SUBJECT = {
    1: true,
    2: false,
} as const;

const semester = 1;

export const cohort = {
    batch: 69,
    intania: 110,
    academicYearTH: 2569,
    academicYearEN: 2026,
    studentIdPrefix: '683',
    studentIdSuffix: '21',
    isSystemOpen: true,
    systemOpenDate: '6 กรกฎาคม 2569',
    appName: 'OR69',
    semester,
    showGroupSubject: SHOW_GROUP_SUBJECT[semester],
    expEngSubjectCode: EXP_ENG_SUBJECTS[semester].code,
    expEngSubjectName: EXP_ENG_SUBJECTS[semester].name,
    cedtProgram: 'วิศวกรรมคอมพิวเตอร์และเทคโนโลยีดิจิทัล',
} as const;

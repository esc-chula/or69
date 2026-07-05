'use client';
import { useUser } from '@/contexts/user-context';
import Notation from '@/components/subjects/notation';
import GroupSubject from '@/components/subjects/group-subject';
import SubjectCard from '@/components/subjects/subject-card';
import CedtNotice from '@/components/subjects/cedt-notice';
import { cohort } from '@/config/cohort';

export default function Page(): JSX.Element {
    const { user } = useUser();

    return (
        <main className='w-full md:px-4'>
            <h1 className='text-center text-2xl font-semibold md:mb-10 md:text-4xl'>
                วิชาที่ต้องลงทะเบียน
            </h1>
            <div className='my-8 flex flex-col justify-between gap-16 md:flex-row'>
                {user.student?.program === cohort.cedtProgram ? (
                    <CedtNotice />
                ) : (
                    <>
                        <div className='flex w-full flex-col gap-6'>
                            {cohort.showGroupSubject ? (
                                <GroupSubject
                                    groupCode={user.group?.groupCode || ''}
                                />
                            ) : null}
                            {user.expEngSection ? (
                                <SubjectCard
                                    section={user.expEngSection}
                                    subjectCode={cohort.expEngSubjectCode}
                                    subjectName={cohort.expEngSubjectName}
                                />
                            ) : null}
                        </div>
                        <Notation />{' '}
                    </>
                )}
            </div>
        </main>
    );
}

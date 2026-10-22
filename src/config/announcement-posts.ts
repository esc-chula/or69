import type { StaticImageData } from 'next/image';
import { cohort } from '@/config/cohort';
import openchatImage from '@/assets/images/announcement/69_openchat.jpg';
import activityImage from '@/assets/images/announcement/69_calendar.jpg';
import registrationImage from '@/assets/images/announcement/69_agenda.jpg';

export interface AnnouncementPost {
    instagramUrl: string;
    images: StaticImageData[];
    scrollable: boolean;
    caption: string;
    className?: string;
    actionLink?: { url: string; label: string };
}

export const announcementPosts: AnnouncementPost[] = [
    {
        instagramUrl:
            'https://www.instagram.com/p/DacNEcYy_PC/',
        images: [openchatImage],
        scrollable: false,
        caption:
            `📍 ขอเชิญชวนให้นิสิตใหม่ Intania ${cohort.intania} ทุกคนเข้ากลุ่ม Facebook และ LINE OpenChat เพื่อติดตามข่าวสาร ประกาศ และกิจกรรมต่าง ๆ ภายในวิศวฯ จุฬาฯ กันนะ\n\n` +
            `🚨 ชาว Intania ${cohort.intania} ทุกคนอย่าลืมกรอกแบบฟอร์มนิสิตใหม่ก่อนที่จะขอเข้ากลุ่มกันด้วยนะ ✨\n👉`,
    },
    {
        instagramUrl: 'https://www.instagram.com/p/DZ4UYDEElbb/?img_index=1',
        images: [activityImage],
        scrollable: false,
        className: 'h-full w-full items-center text-base',
        caption:
            `📣 กำหนดการกิจกรรมสำหรับนิสิตวิศวฯ ⚙️🗓️\n\n` +
            `ชาว Intania ${cohort.intania} ทุกคนจะได้เจอกับกิจกรรมต่างมากมายและพบเพื่อนทั้งในและนอกคณะ บอกเลยว่าห้ามพลาดทุกกิจกรรมเลย !`,
    },
    {
        instagramUrl: 'https://www.instagram.com/p/DZ4UYDEElbb/?img_index=2',
        images: [registrationImage],
        scrollable: false,
        caption: `📣 กำหนดการการลงทะเบียนนิสิตใหม่ ภาคการศึกษาต้น ปีการศึกษา ${cohort.academicYearTH} ⚙️📚 [รหัส ${cohort.batch}]`,
    },
];

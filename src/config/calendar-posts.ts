import type { StaticImageData } from 'next/image';
import { cohort } from '@/config/cohort';
import CalendarCarousel1 from '@/assets/images/calendar/68_openchat1.jpg';
import CalendarCarousel2 from '@/assets/images/calendar/68_openchat2.jpg';
import CalendarCarousel3 from '@/assets/images/calendar/68_openchat3.jpg';
import activityImage from '@/assets/images/calendar/68_calendar.png';
import registrationImage from '@/assets/images/calendar/68_agenda.jpg';

export interface CalendarPost {
    instagramUrl: string;
    images: StaticImageData[];
    scrollable: boolean;
    caption: string;
    className?: string;
    actionLink?: { url: string; label: string };
}

export const calendarPosts: CalendarPost[] = [
    {
        instagramUrl:
            'https://www.instagram.com/p/DLrvY20MUxD/?igsh=MnE2dm0xc2NqYTI2',
        images: [CalendarCarousel1, CalendarCarousel2, CalendarCarousel3],
        scrollable: true,
        caption:
            `📍 ขอเชิญชวนให้นิสิตใหม่ Intania ${cohort.intania} ทุกคนเข้ากลุ่ม Facebook และ LINE OpenChat เพื่อติดตามข่าวสาร ประกาศ และกิจกรรมต่าง ๆ ภายในวิศวฯ จุฬาฯ กันนะ\n\n` +
            `🚨 ชาว Intania ${cohort.intania} ทุกคนอย่าลืมกรอกแบบฟอร์มนิสิตใหม่ก่อนที่จะขอเข้ากลุ่มกันด้วยนะ ✨\n👉`,
        actionLink: {
            url: 'https://bit.ly/nisit109-entry-form',
            label: 'https://bit.ly/nisit109-entry-form',
        },
    },
    {
        instagramUrl:
            'https://www.instagram.com/p/DLPGG6DSFKV/?igsh=MWU0N3dtdG9zaG5uNw==',
        images: [activityImage],
        scrollable: false,
        className: 'h-full w-full items-center text-base',
        caption:
            `📣 กำหนดการกิจกรรมสำหรับนิสิตวิศวฯ ⚙️🗓️\n\n` +
            `ชาว Intania ${cohort.intania} ทุกคนจะได้เจอกับกิจกรรมต่างมากมายและพบเพื่อนทั้งในและนอกคณะ บอกเลยว่าห้ามพลาดทุกกิจกรรมเลย !`,
    },
    {
        instagramUrl:
            'https://www.instagram.com/p/DLPIWbDSS4T/?igsh=NmFwc2c2cWd0eHJn',
        images: [registrationImage],
        scrollable: false,
        caption: `📣 กำหนดการการลงทะเบียนนิสิตใหม่ ภาคการศึกษาต้น ปีการศึกษา ${cohort.academicYearTH} ⚙️📚 [รหัส ${cohort.batch}]`,
    },
];

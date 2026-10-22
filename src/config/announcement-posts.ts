import type { StaticImageData } from 'next/image';
import { cohort } from '@/config/cohort';
import facultyPageImage from '@/assets/images/announcement/69_2_page_faculty.jpg';
import clubPageImage from '@/assets/images/announcement/69_2_page_clubs.jpg';

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
        instagramUrl: 'https://www.instagram.com/p/DetjL3aEhuI/?img_index=1',
        images: [facultyPageImage],
        scrollable: false,
        caption:
            `รวมเพจ/ไอจีที่ชาว INTANIA ควรฟอล (Ver. คณะ) 📲✨\n\n` +
            `กลัวพลาดข่าวสำคัญ ? ไม่ว่าจะเรื่องเรียน กิจกรรม งานวิ่ง เทคโนโลยี ค่ายอาสา หรือโอกาสเติบโตในสายอาชีพ เราสรุปมาให้แล้วในโพสต์นี้ ! 👆🏻⚙️`,
    },
    {
        instagramUrl: 'https://www.instagram.com/p/DewDajWEiGj/?img_index=1',
        images: [clubPageImage],
        scrollable: false,
        className: 'h-full w-full items-center text-base',
        caption:
            `รวมเพจ/ไอจีที่ชาว INTANIA ควรฟอล (Ver. ชมรม) 🔧✨\n\n` +
            `รวมทุกชมรมของวิศวฯ จุฬาฯ ไว้ที่นี่ 💥\n` +
            `ไม่ว่าจะสายวิชาการ สายศิลปะ วัฒนธรรม และสื่อ\n` +
            `สายกีฬา สายเทคโนโลยี สายจิตอาสา หรืออื่น ๆ 👀\n\n` +
            `อยากติดตามผลงานหรือเข้าร่วมกิจกรรมของชมรมไหน กดฟอลไว้ได้เลย ❗️ 💫`,
    },
    // {
    //     instagramUrl: 'https://www.instagram.com/p/DZ4UYDEElbb/?img_index=2',
    //     images: [registrationImage],
    //     scrollable: false,
    //     caption: `📣 กำหนดการการลงทะเบียนนิสิตใหม่ ภาคการศึกษาต้น ปีการศึกษา ${cohort.academicYearTH} ⚙️📚 [รหัส ${cohort.batch}]`,
    // },
];

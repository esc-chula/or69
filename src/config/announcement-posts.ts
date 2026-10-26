import type { StaticImageData } from 'next/image';
import { cohort } from '@/config/cohort';
import facultyPageImage from '@/assets/images/announcement/69_2_page_faculty.jpg';
import agendaImage from '@/assets/images/announcement/69_2_agenda.jpg';
import registrationImage from '@/assets/images/announcement/69_2_registration.jpg';

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
        instagramUrl: 'https://www.instagram.com/p/De8LA61EqtL/?img_index=2',
        images: [agendaImage],
        scrollable: false,
        className: 'h-full w-full items-center text-base',
        caption: `📣 กำหนดการการลงทะเบียนเรียนสำหรับนิสิตปัจจุบัน ภาคการศึกษาปลาย ปีการศึกษา ${cohort.academicYearTH} ⚙️📚`,
    },
    {
        instagramUrl: 'https://www.instagram.com/p/De8iRGtSAdx/?img_index=1',
        images: [registrationImage],
        scrollable: false,
        caption:
            `✨ INTANIA ${cohort.intania} ดูวิชาเรียนง่าย ๆ ได้เลยที่เว็บไซต์ OR${cohort.batch} ! ✨\n` +
            `หมดปัญหางงว่าต้องลงวิชาอะไร ลง sec ไหนบ้าง 💻\n\n` +
            `ใช้งานได้เลยทั้งในโทรศัพท์ แท็บเล็ต และโน้ตบุ๊ก ตรวจสอบวิชาที่ต้องลงทะเบียนได้เลยรายบุคคล ❗️🤩`,
    },
];

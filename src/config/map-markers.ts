import type { Marker } from 'react-image-marker';
import type { StaticImageData } from 'next/image';
import basketball from '@/assets/images/map/basketball.png';
import building3 from '@/assets/images/map/building3.png';
import building4 from '@/assets/images/map/building4.png';
import civil from '@/assets/images/map/civil.png';
import elect from '@/assets/images/map/elect.png';
import garden from '@/assets/images/map/garden.png';
import hans from '@/assets/images/map/hans.png';
import icanteen from '@/assets/images/map/icanteen.png';
import nuclear from '@/assets/images/map/nuclear.png';
import survey from '@/assets/images/map/survey.png';

export interface MapMarker {
    image: StaticImageData;
    name: string;
    marker: Marker;
}

export const mapMarkers: MapMarker[] = [
    { image: basketball, name: 'สนามบาสวิศวะ', marker: { top: 81, left: 48 } },
    { image: building3, name: 'ตึก 3', marker: { top: 12, left: 45 } },
    { image: building4, name: 'ตึก 4', marker: { top: 50, left: 77 } },
    { image: civil, name: 'ตึกภาคโยธา', marker: { top: 70, left: 40 } },
    { image: elect, name: 'ตึกภาคไฟฟ้า', marker: { top: 33, left: 8 } },
    { image: garden, name: 'สวนรวมใจ', marker: { top: 12, left: 20 } },
    { image: hans, name: 'ตึกฮันส์ บันตลิ', marker: { top: 43, left: 65 } },
    { image: icanteen, name: 'ICanteen', marker: { top: 2, left: 80 } },
    { image: nuclear, name: 'ตึกภาคนิวเคลียร์', marker: { top: 70, left: 83 } },
    { image: survey, name: 'ตึกภาคสำรวจ', marker: { top: 78, left: 27 } },
];
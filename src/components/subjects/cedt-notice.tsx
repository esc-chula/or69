export default function CedtNotice(): JSX.Element {
    return (
        <div className='flex flex-col gap-4 rounded-2xl bg-background p-8 shadow-lg'>
            <div className='flex flex-col'>
                <p className='font-semibold'>หมายเหตุสำหรับนิสิต CEDT</p>
                <p>
                    นิสิตสาขาวิชาวิศวกรรมคอมพิวเตอร์และเทคโนโลยีดิจิทัล
                    จะได้รับข้อมูลการลงทะเบียนเรียน/ตารางเรียนจาก
                    <u>ช่องทางของสาขาวิชาโดยตรง</u> กรุณาติดตามข้อมูลจากสาขาวิชา
                </p>
            </div>
        </div>
    );
}

import type { Metadata } from 'next';
import '@/styles/globals.css';
import { cohort } from '@/config/cohort';

export const metadata: Metadata = {
    title: cohort.appName,
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}): JSX.Element {
    return (
        <main className='flex w-full max-w-6xl flex-1 flex-col px-5'>
            {children}
        </main>
    );
}

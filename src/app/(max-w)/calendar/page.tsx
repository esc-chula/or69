'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Fragment, useState, useEffect } from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { calendarPosts } from '@/config/calendar-posts';
import { FacebookIcon } from '@/assets/icons/facebook';
import { InstagramIcon } from '@/assets/icons/instagram';

export default function Page(): JSX.Element {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState<number>(0);

    useEffect(() => {
        if (!api) return;
        setCurrent(api.selectedScrollSnap() + 1);
        api.on('select', () => {
            setCurrent(api.selectedScrollSnap() + 1);
        });
    }, [api]);

    useEffect(() => {
        const timer = setInterval(() => {
            if (api) {
                if (api.canScrollNext()) api.scrollNext();
                else api.scrollTo(0);
            }
        }, 5000);
        return () => clearInterval(timer);
    }, [api]);

    return (
        <main className='flex flex-col items-center'>
            <h2 className='mb-12 text-center text-2xl font-semibold md:text-4xl'>
                ปฏิทินคณะ
            </h2>
            <div className='grid w-full max-w-sm grid-cols-1 gap-5 md:max-w-none md:grid-cols-3'>
                {calendarPosts.map((post, index) => (
                    <Link
                        className={post.className ?? 'text-base'}
                        href={post.instagramUrl}
                        key={index}
                        rel='noopener noreferrer'
                        target='_blank'
                    >
                        {post.scrollable ? (
                            <>
                                <div className='z-0'>
                                    <Carousel
                                        orientation='horizontal'
                                        setApi={setApi}
                                    >
                                        <CarouselContent>
                                            {post.images.map((src, i) => (
                                                <CarouselItem
                                                    className='h-full w-full'
                                                    key={`carousel-${i + 1}`}
                                                >
                                                    <Image alt='' src={src} />
                                                </CarouselItem>
                                            ))}
                                        </CarouselContent>
                                    </Carousel>
                                </div>
                                <div className='flex justify-center pt-4'>
                                    {post.images.map((_, i) => (
                                        <Button
                                            className={`${
                                                current === i + 1
                                                    ? 'bg-gray-800'
                                                    : 'bg-gray-300'
                                            } m-1 h-2 w-2 rounded-full`}
                                            key={`dot-${i + 1}`}
                                            onClick={() => api?.scrollTo(i)}
                                        />
                                    ))}
                                </div>
                            </>
                        ) : (
                            <Image alt='' src={post.images[0]} />
                        )}
                        <p className='mb-12 mt-4 px-2 text-start'>
                            {post.caption.split('\n').map((line, i, arr) => (
                                <Fragment key={i}>
                                    {line}
                                    {i < arr.length - 1 && <br />}
                                </Fragment>
                            ))}
                            {post.actionLink ? (
                                <>
                                    {' '}
                                    <Link
                                        className='z-50 font-bold text-primary underline'
                                        href={post.actionLink.url}
                                        rel='noopener noreferrer'
                                        target='_blank'
                                    >
                                        {post.actionLink.label}
                                    </Link>
                                </>
                            ) : null}
                        </p>
                    </Link>
                ))}
            </div>
            <div className='flex flex-col items-center md:m-20'>
                <h3>ติดตามข่าวสารเพิ่มเติมได้ที่</h3>
                <div className='m-4 flex flex-row gap-x-5'>
                    <Link
                        href='https://www.facebook.com/escchula'
                        rel='noopener noreferrer'
                        target='_blank'
                    >
                        <FacebookIcon height={52} width={52} />
                    </Link>
                    <Link
                        href='https://www.instagram.com/escchula/?hl=en'
                        rel='noopener noreferrer'
                        target='_blank'
                    >
                        <InstagramIcon height={52} width={52} />
                    </Link>
                </div>
            </div>
        </main>
    );
}
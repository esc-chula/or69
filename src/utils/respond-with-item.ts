import { NextResponse } from 'next/server';

// fetches a JSON array from a server-only data URL and responds with the one item `find` picks,
// so neither the URL nor the rest of the data reaches the client
export const respondWithItem = async <T>(
    url: string | undefined,
    find: (items: T[]) => T
): Promise<NextResponse> => {
    try {
        if (!url) {
            throw new Error('Invalid URL');
        }

        const res = await fetch(url);
        if (!res.ok) {
            throw new Error('Failed to fetch data');
        }

        const items = (await res.json()) as T[];

        return NextResponse.json(find(items));
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(
                {
                    error: error.message,
                },
                {
                    status: 404,
                }
            );
        }

        return NextResponse.json(
            {
                error: 'Failed to fetch',
            },
            {
                status: 500,
            }
        );
    }
};

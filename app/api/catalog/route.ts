import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: NextRequest) {
    try {
        const courses = await db.course.findMany({
            where: {
                isPublished: true,
            },
            include: {
                instructor: {
                    select: {
                        name: true,
                        image: true,
                    },
                },
                modules: {
                    include: {
                        lessons: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return NextResponse.json(courses);
    } catch (error) {
        console.error('Error fetching catalog:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

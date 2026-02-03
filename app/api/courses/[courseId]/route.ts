import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';

export async function GET(
    req: NextRequest,
    { params }: { params: { courseId: string } }
) {
    try {
        const { userId } = await auth();
        const { courseId } = await params;

        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const course = await db.course.findUnique({
            where: {
                id: courseId,
                instructorId: userId,
            },
            include: {
                modules: {
                    orderBy: {
                        position: 'asc',
                    },
                    include: {
                        lessons: {
                            orderBy: {
                                position: 'asc',
                            },
                        },
                    },
                },
            },
        });

        if (!course) {
            return NextResponse.json({ error: 'Course not found' }, { status: 404 });
        }

        return NextResponse.json(course);
    } catch (error) {
        console.error('Error fetching course:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function PATCH(
    req: NextRequest,
    { params }: { params: { courseId: string } }
) {
    try {
        const { userId } = await auth();
        const { courseId } = await params;
        const values = await req.json();

        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const course = await db.course.update({
            where: {
                id: courseId,
                instructorId: userId,
            },
            data: {
                ...values,
            },
        });

        return NextResponse.json(course);
    } catch (error) {
        console.error('Error updating course:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: { courseId: string } }
) {
    try {
        const { userId } = await auth();
        const { courseId } = await params;

        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const course = await db.course.delete({
            where: {
                id: courseId,
                instructorId: userId,
            },
        });

        return NextResponse.json(course);
    } catch (error) {
        console.error('Error deleting course:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

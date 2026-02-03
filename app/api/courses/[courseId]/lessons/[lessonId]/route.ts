import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';

export async function GET(
    req: NextRequest,
    { params }: { params: { courseId: string, lessonId: string } }
) {
    try {
        const { userId } = await auth();
        const { courseId, lessonId } = await params;

        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const lesson = await db.lesson.findUnique({
            where: {
                id: lessonId,
            },
            include: {
                module: {
                    include: {
                        course: true
                    }
                }
            }
        });

        if (!lesson || lesson.module.course.instructorId !== userId) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 });
        }

        return NextResponse.json(lesson);
    } catch (error) {
        console.error('Error fetching lesson:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function PATCH(
    req: NextRequest,
    { params }: { params: { courseId: string, lessonId: string } }
) {
    try {
        const { userId } = await auth();
        const { courseId, lessonId } = await params;
        const values = await req.json();

        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const lesson = await db.lesson.findUnique({
            where: { id: lessonId },
            include: { module: { include: { course: true } } }
        });

        if (!lesson || lesson.module.course.instructorId !== userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const updatedLesson = await db.lesson.update({
            where: { id: lessonId },
            data: { ...values },
        });

        return NextResponse.json(updatedLesson);
    } catch (error) {
        console.error('Error updating lesson:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

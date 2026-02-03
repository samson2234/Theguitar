import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';

export async function POST(
    req: NextRequest,
    { params }: { params: { courseId: string, moduleId: string } }
) {
    try {
        const { userId } = await auth();
        const { courseId, moduleId } = await params;
        const { title } = await req.json();

        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const courseOwner = await db.course.findUnique({
            where: {
                id: courseId,
                instructorId: userId,
            }
        });

        if (!courseOwner) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const lastLesson = await db.lesson.findFirst({
            where: {
                moduleId: moduleId,
            },
            orderBy: {
                position: 'desc',
            },
        });

        const newPosition = lastLesson ? lastLesson.position + 1 : 1;

        const lesson = await db.lesson.create({
            data: {
                title,
                moduleId: moduleId,
                position: newPosition,
            },
        });

        return NextResponse.json(lesson);
    } catch (error) {
        console.error('Error creating lesson:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

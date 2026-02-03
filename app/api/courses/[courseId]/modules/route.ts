import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';

export async function POST(
    req: NextRequest,
    { params }: { params: { courseId: string } }
) {
    try {
        const { userId } = await auth();
        const { courseId } = await params;
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

        const lastModule = await db.module.findFirst({
            where: {
                courseId: courseId,
            },
            orderBy: {
                position: 'desc',
            },
        });

        const newPosition = lastModule ? lastModule.position + 1 : 1;

        const module = await db.module.create({
            data: {
                title,
                courseId: courseId,
                position: newPosition,
            },
        });

        return NextResponse.json(module);
    } catch (error) {
        console.error('Error creating module:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

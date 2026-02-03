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

        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Check if already enrolled
        const existingEnrollment = await db.enrollment.findUnique({
            where: {
                userId_courseId: {
                    userId,
                    courseId,
                },
            },
        });

        if (existingEnrollment) {
            return NextResponse.json({ message: 'Already enrolled' });
        }

        const enrollment = await db.enrollment.create({
            data: {
                userId,
                courseId,
            },
        });

        return NextResponse.json(enrollment);
    } catch (error) {
        console.error('Error enrolling:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function GET(
    req: NextRequest,
    { params }: { params: { courseId: string } }
) {
    try {
        const { userId } = await auth();
        const { courseId } = await params;

        if (!userId) {
            return NextResponse.json({ isEnrolled: false });
        }

        const enrollment = await db.enrollment.findUnique({
            where: {
                userId_courseId: {
                    userId,
                    courseId,
                },
            },
        });

        return NextResponse.json({ isEnrolled: !!enrollment });
    } catch (error) {
        console.error('Error checking enrollment:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';

export async function GET(req: NextRequest) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const enrollments = await db.enrollment.findMany({
            where: {
                userId,
            },
            include: {
                course: {
                    include: {
                        instructor: {
                            select: { name: true }
                        }
                    }
                }
            },
            orderBy: {
                enrolledAt: 'desc',
            },
        });

        return NextResponse.json(enrollments.map(e => e.course));
    } catch (error) {
        console.error('Error fetching enrolled courses:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { auth, clerkClient } from '@clerk/nextjs/server';

export async function POST(req: NextRequest) {
    try {
        const { userId: clerkUserId } = await auth();

        if (!clerkUserId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { role } = body;

        if (!role || (role !== 'STUDENT' && role !== 'INSTRUCTOR')) {
            return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
        }

        // 1. Update Clerk Metadata
        const client = await clerkClient();
        await client.users.updateUser(clerkUserId, {
            publicMetadata: {
                role: role,
            },
        });

        // 2. Update Database
        const updatedUser = await db.user.update({
            where: { id: clerkUserId },
            data: {
                role: role,
            },
        });

        return NextResponse.json({ user: updatedUser });
    } catch (error) {
        console.error('Error switching role:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

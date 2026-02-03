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
        const { userId, email, name, role } = body;

        if (!userId || !email || !role) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // 1. Update Clerk Public Metadata (so it can be used in middleware)
        const client = await clerkClient();
        await client.users.updateUser(clerkUserId, {
            publicMetadata: {
                role: role,
            },
        });

        // 2. Check if user already exists in database
        const existingUser = await db.user.findUnique({
            where: { id: userId },
        });

        if (existingUser) {
            // Update existing user
            const updatedUser = await db.user.update({
                where: { id: userId },
                data: {
                    name,
                    email,
                    role,
                    updatedAt: new Date(),
                },
            });
            return NextResponse.json({ user: updatedUser });
        }

        // 3. Create new user in database
        const newUser = await db.user.create({
            data: {
                id: userId,
                email,
                name,
                role,
            },
        });

        return NextResponse.json({ user: newUser });
    } catch (error) {
        console.error('Error syncing user:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
    try {
        const courses = await db.course.findMany({
            include: {
                instructor: {
                    select: {
                        name: true,
                    }
                },
                _count: {
                    select: {
                        modules: true,
                    }
                }
            },
            where: {
                isPublished: true,
            }
        });

        return NextResponse.json(courses);
    } catch (error) {
        console.error("[COURSES_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
    '/',
    '/sign-in(.*)',
    '/sign-up(.*)',
    '/courses(.*)',
    '/api/webhooks(.*)',
]);

// Define instructor-only routes
const isInstructorRoute = createRouteMatcher([
    '/instructor(.*)',
]);

export default clerkMiddleware(async (auth, request) => {
    const { userId, sessionClaims } = await auth();

    // If the route is public, allow access
    if (isPublicRoute(request)) {
        return NextResponse.next();
    }

    // If user is not authenticated and trying to access protected route
    if (!userId) {
        const signInUrl = new URL('/sign-in', request.url);
        signInUrl.searchParams.set('redirect_url', request.url);
        return NextResponse.redirect(signInUrl);
    }

    // Check if user is trying to access instructor routes
    if (isInstructorRoute(request)) {
        const userRole = (sessionClaims?.metadata as { role?: string })?.role;

        if (userRole !== 'INSTRUCTOR' && userRole !== 'ADMIN') {
            // Redirect non-instructors away from instructor routes
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
    }

    return NextResponse.next();
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};

import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
    '/',
    '/sign-in(.*)',
    '/sign-up(.*)',
    '/courses(.*)',
    '/api/webhook/clerk',
    '/api/webhooks(.*)',
    '/api/auth/sync-user',
]);

const isOnboardingRoute = createRouteMatcher(['/onboarding']);

// Define instructor-only routes
const isInstructorRoute = createRouteMatcher([
    '/instructor(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
    const { userId, sessionClaims } = await auth();

    // If the route is public, allow access
    if (isPublicRoute(req)) {
        return NextResponse.next();
    }

    // If user is not authenticated and trying to access protected route
    if (!userId) {
        const signInUrl = new URL('/sign-in', req.url);
        signInUrl.searchParams.set('redirect_url', req.url);
        return NextResponse.redirect(signInUrl);
    }

    // If user is logged in
    if (userId) {
        // Check if user has completed onboarding
        const userRole = (sessionClaims?.metadata as { role?: string })?.role;
        const isCompletedOnboarding = userRole;

        // Check if user is trying to access instructor routes
        if (isInstructorRoute(req)) {
            if (userRole !== 'INSTRUCTOR' && userRole !== 'ADMIN') {
                // Redirect non-instructors away from instructor routes
                return NextResponse.redirect(new URL('/dashboard', req.url));
            }
        }

        // If they haven't completed onboarding and are not on the onboarding page, redirect them
        if (!isCompletedOnboarding && !isOnboardingRoute(req)) {
            const onboardingUrl = new URL('/onboarding', req.url);
            return NextResponse.redirect(onboardingUrl);
        }

        // If they have completed onboarding and are trying to access onboarding page, redirect to dashboard
        if (isCompletedOnboarding && isOnboardingRoute(req)) {
            const dashboardUrl = userRole === 'INSTRUCTOR'
                ? new URL('/instructor/dashboard', req.url)
                : new URL('/dashboard', req.url);
            return NextResponse.redirect(dashboardUrl);
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

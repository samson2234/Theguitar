import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher([
    '/',
    '/sign-in(.*)',
    '/sign-up(.*)',
    '/api/webhook/clerk',
    '/api/auth/sync-user',
]);

const isOnboardingRoute = createRouteMatcher(['/onboarding']);

export default clerkMiddleware(async (auth, req) => {
    const { userId, sessionClaims } = await auth();

    // If user is logged in
    if (userId) {
        // Check if user has completed onboarding
        const isCompletedOnboarding = sessionClaims?.metadata?.role;

        // If they haven't completed onboarding and are not on the onboarding page, redirect them
        if (!isCompletedOnboarding && !isOnboardingRoute(req) && !isPublicRoute(req)) {
            const onboardingUrl = new URL('/onboarding', req.url);
            return NextResponse.redirect(onboardingUrl);
        }

        // If they have completed onboarding and are trying to access onboarding page, redirect to dashboard
        if (isCompletedOnboarding && isOnboardingRoute(req)) {
            const dashboardUrl = sessionClaims.metadata.role === 'INSTRUCTOR'
                ? new URL('/instructor/dashboard', req.url)
                : new URL('/dashboard', req.url);
            return NextResponse.redirect(dashboardUrl);
        }
    }

    // Handle protected routes
    if (!isPublicRoute(req)) {
        await auth.protect();
    }
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};

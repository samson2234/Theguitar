'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function OnboardingPage() {
    const { user } = useUser();
    const router = useRouter();
    const [selectedRole, setSelectedRole] = useState<'STUDENT' | 'INSTRUCTOR' | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleRoleSelection = async () => {
        if (!selectedRole || !user) return;

        setIsLoading(true);
        try {
            // Sync with database and update Clerk metadata via backend
            const response = await fetch('/api/auth/sync-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: user.id,
                    email: user.emailAddresses[0]?.emailAddress,
                    name: user.fullName,
                    role: selectedRole,
                }),
            });

            if (!response.ok) {
                const data = await response.json().catch(() => ({}));
                throw new Error(`Error: ${data.error || response.statusText || 'Failed to sync account'}`);
            }

            // Force a session refresh to pick up the new metadata
            await user.reload();

            // Redirect based on role
            if (selectedRole === 'INSTRUCTOR') {
                router.push('/instructor/dashboard');
            } else {
                router.push('/dashboard');
            }
        } catch (error: any) {
            console.error('Error setting role:', error);
            alert(error.message || 'Failed to set role. Please try again.');
            setIsLoading(false);
        }
    };

    return (
        <div className="onboarding-container">
            <div className="onboarding-content">
                <div className="onboarding-header">
                    <a href="/" className="logo">
                        <div className="logo-icon">♪</div>
                        StringMaster
                    </a>
                    <h1>Choose your path</h1>
                    <p>Are you here to learn or to teach?</p>
                </div>

                <div className="role-selection">
                    <div
                        className={`role-card ${selectedRole === 'STUDENT' ? 'selected' : ''}`}
                        onClick={() => setSelectedRole('STUDENT')}
                    >
                        <div className="role-icon">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                                <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
                            </svg>
                        </div>
                        <h3>I'm a Student</h3>
                        <p>Learn guitar with interactive lessons, track your progress, and master new skills</p>
                        <ul className="role-features">
                            <li>✓ Access 200+ video lessons</li>
                            <li>✓ Interactive fretboard trainer</li>
                            <li>✓ Track your progress</li>
                            <li>✓ Join the community</li>
                        </ul>
                    </div>

                    <div
                        className={`role-card ${selectedRole === 'INSTRUCTOR' ? 'selected' : ''}`}
                        onClick={() => setSelectedRole('INSTRUCTOR')}
                    >
                        <div className="role-icon">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <circle cx="12" cy="12" r="3" />
                                <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24" />
                            </svg>
                        </div>
                        <h3>I'm an Instructor</h3>
                        <p>Share your expertise, create courses, and inspire students worldwide</p>
                        <ul className="role-features">
                            <li>✓ Create unlimited courses</li>
                            <li>✓ Upload video lessons</li>
                            <li>✓ Manage students</li>
                            <li>✓ Earn revenue</li>
                        </ul>
                    </div>
                </div>

                <button
                    className="btn-primary onboarding-continue"
                    onClick={handleRoleSelection}
                    disabled={!selectedRole || isLoading}
                >
                    {isLoading ? 'Setting up your account...' : 'Continue →'}
                </button>
            </div>
        </div>
    );
}

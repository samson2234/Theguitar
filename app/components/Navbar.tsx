"use client";

import React, { useState } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isSignedIn, user, isLoaded } = useUser();
    const router = useRouter();
    const [isSwitching, setIsSwitching] = useState(false);

    // Get role from publicMetadata (preferred) or unsafeMetadata
    const userRole = (user?.publicMetadata?.role || user?.unsafeMetadata?.role) as string;

    return (
        <nav>
            <div className="nav-container">
                <Link href="/" className="logo">
                    <div className="logo-icon">♪</div>
                    StringMaster
                </Link>
                <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
                    <li><a href="/#features" onClick={() => setIsMenuOpen(false)}>Features</a></li>
                    <li><a href="/#pricing" onClick={() => setIsMenuOpen(false)}>Pricing</a></li>
                    <li><a href="/#instructors" onClick={() => setIsMenuOpen(false)}>Instructors</a></li>
                    <li><a href="/#testimonials" onClick={() => setIsMenuOpen(false)}>Reviews</a></li>
                    {isSignedIn && (
                        <>
                            <li><Link href="/courses" onClick={() => setIsMenuOpen(false)}>Courses</Link></li>
                            <li>
                                <Link
                                    href={userRole === 'INSTRUCTOR' ? '/instructor/dashboard' : '/dashboard'}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Dashboard
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
                <div className="nav-actions">
                    {isSignedIn ? (
                        <div className="user-section">
                            {isLoaded && userRole && (
                                <button
                                    onClick={async () => {
                                        const newRole = userRole === 'INSTRUCTOR' ? 'STUDENT' : 'INSTRUCTOR';
                                        if (confirm(`Switch to ${newRole.toLowerCase()} mode?`)) {
                                            setIsSwitching(true);
                                            try {
                                                const res = await fetch('/api/user/switch-role', {
                                                    method: 'POST',
                                                    body: JSON.stringify({ role: newRole }),
                                                });
                                                if (res.ok) {
                                                    await user?.reload();
                                                    router.push(newRole === 'INSTRUCTOR' ? '/instructor/dashboard' : '/dashboard');
                                                }
                                            } catch (err) {
                                                console.error(err);
                                            } finally {
                                                setIsSwitching(false);
                                            }
                                        }
                                    }}
                                    className="switch-role-btn"
                                    disabled={isSwitching}
                                    style={{
                                        background: 'rgba(255, 255, 255, 0.1)',
                                        border: '1px solid rgba(255, 255, 255, 0.2)',
                                        color: 'white',
                                        padding: '4px 12px',
                                        borderRadius: '20px',
                                        fontSize: '0.8rem',
                                        cursor: 'pointer',
                                        marginRight: '1rem',
                                        transition: 'all 0.3s'
                                    }}
                                >
                                    {isSwitching ? 'Switching...' : `Switch to ${userRole === 'INSTRUCTOR' ? 'Student' : 'Instructor'}`}
                                </button>
                            )}
                            <span className="user-greeting" style={{ marginRight: '0.5rem' }}>Hi, {user?.firstName || 'there'}!</span>
                            <UserButton
                                afterSignOutUrl="/"
                                appearance={{
                                    elements: {
                                        avatarBox: "w-10 h-10 border-2 border-purple-500"
                                    }
                                }}
                            />
                        </div>
                    ) : (
                        <>
                            <Link href="/sign-in" className="nav-signin">
                                Sign In
                            </Link>
                            <Link href="/sign-up" className="nav-cta">
                                <span>Start Free Trial</span>
                            </Link>
                        </>
                    )}
                </div>
                <button
                    className="mobile-menu-btn"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? "✕" : "☰"}
                </button>
            </div>
        </nav>
    );
}


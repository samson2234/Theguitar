"use client";

import React, { useState } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isSignedIn, user } = useUser();
    const userRole = user?.unsafeMetadata?.role as string;

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
                            <span className="user-greeting">Hi, {user?.firstName || 'there'}!</span>
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


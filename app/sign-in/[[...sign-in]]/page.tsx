'use client';

import { SignIn } from '@clerk/nextjs';
import Link from 'next/link';

export default function SignInPage() {
    return (
        <div className="auth-page">
            {/* Left Side - Branding */}
            <div className="auth-branding">
                <div className="auth-brand-content">
                    <Link href="/" className="auth-logo">
                        <div className="auth-logo-icon">🎸</div>
                        <span>StringMaster</span>
                    </Link>

                    <h1 className="auth-brand-title">
                        Welcome back, <span className="text-gradient">guitarist!</span>
                    </h1>

                    <p className="auth-brand-subtitle">
                        Continue your journey to guitar mastery. Pick up where you left off.
                    </p>

                    <div className="auth-features">
                        <div className="auth-feature">
                            <div className="auth-feature-icon">📚</div>
                            <div>
                                <h4>500+ Video Lessons</h4>
                                <p>From basics to advanced shredding</p>
                            </div>
                        </div>
                        <div className="auth-feature">
                            <div className="auth-feature-icon">🎯</div>
                            <div>
                                <h4>Track Your Progress</h4>
                                <p>See your improvement over time</p>
                            </div>
                        </div>
                        <div className="auth-feature">
                            <div className="auth-feature-icon">🏆</div>
                            <div>
                                <h4>Earn Certificates</h4>
                                <p>Showcase your achievements</p>
                            </div>
                        </div>
                    </div>

                    <div className="auth-testimonial">
                        <div className="auth-testimonial-stars">★★★★★</div>
                        <p>"StringMaster helped me go from zero to playing my favorite songs in just 3 months!"</p>
                        <div className="auth-testimonial-author">
                            <div className="auth-testimonial-avatar">JD</div>
                            <div>
                                <strong>James D.</strong>
                                <span>Student since 2024</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Sign In Form */}
            <div className="auth-form-container">
                <div className="auth-form-wrapper">
                    <div className="auth-form-header">
                        <h2>Sign in to your account</h2>
                        <p>Don't have an account? <Link href="/sign-up" className="auth-link">Sign up free</Link></p>
                    </div>

                    <SignIn
                        appearance={{
                            elements: {
                                rootBox: "clerk-root-box",
                                card: "clerk-card",
                                headerTitle: "clerk-hidden",
                                headerSubtitle: "clerk-hidden",
                                socialButtonsBlockButton: "clerk-social-btn",
                                socialButtonsBlockButtonText: "clerk-social-text",
                                dividerLine: "clerk-divider",
                                dividerText: "clerk-divider-text",
                                formButtonPrimary: "clerk-primary-btn",
                                footerActionLink: "clerk-footer-link",
                                formFieldInput: "clerk-input",
                                formFieldLabel: "clerk-label",
                                identityPreviewEditButton: "clerk-edit-btn",
                                formFieldAction: "clerk-field-action",
                                footer: "clerk-footer",
                                footerAction: "clerk-footer-action",
                                internal: "clerk-internal",
                            },
                            layout: {
                                socialButtonsPlacement: "top",
                                socialButtonsVariant: "blockButton",
                            }
                        }}
                        forceRedirectUrl="/dashboard"
                        signUpUrl="/sign-up"
                    />

                    <div className="auth-trust-badges">
                        <div className="trust-badge">
                            <span className="trust-icon">🔒</span>
                            <span>Secure Login</span>
                        </div>
                        <div className="trust-badge">
                            <span className="trust-icon">👥</span>
                            <span>50,000+ Students</span>
                        </div>
                        <div className="trust-badge">
                            <span className="trust-icon">⭐</span>
                            <span>4.9/5 Rating</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

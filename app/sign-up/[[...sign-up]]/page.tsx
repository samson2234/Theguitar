'use client';

import { SignUp } from '@clerk/nextjs';
import Link from 'next/link';

export default function SignUpPage() {
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
                        Start your <span className="text-gradient">guitar journey</span> today
                    </h1>

                    <p className="auth-brand-subtitle">
                        Join 50,000+ students learning guitar the modern way. From complete beginner to stage-ready performer.
                    </p>

                    <div className="auth-features">
                        <div className="auth-feature">
                            <div className="auth-feature-icon">✨</div>
                            <div>
                                <h4>Free to Start</h4>
                                <p>Access beginner lessons at no cost</p>
                            </div>
                        </div>
                        <div className="auth-feature">
                            <div className="auth-feature-icon">🎬</div>
                            <div>
                                <h4>HD Video Lessons</h4>
                                <p>Crystal clear 4K instruction</p>
                            </div>
                        </div>
                        <div className="auth-feature">
                            <div className="auth-feature-icon">🎵</div>
                            <div>
                                <h4>Learn Any Song</h4>
                                <p>Tabs for 10,000+ popular songs</p>
                            </div>
                        </div>
                        <div className="auth-feature">
                            <div className="auth-feature-icon">🤖</div>
                            <div>
                                <h4>AI Feedback</h4>
                                <p>Real-time correction on your playing</p>
                            </div>
                        </div>
                    </div>

                    <div className="auth-stats">
                        <div className="auth-stat">
                            <span className="auth-stat-number">50K+</span>
                            <span className="auth-stat-label">Students</span>
                        </div>
                        <div className="auth-stat">
                            <span className="auth-stat-number">500+</span>
                            <span className="auth-stat-label">Lessons</span>
                        </div>
                        <div className="auth-stat">
                            <span className="auth-stat-number">4.9</span>
                            <span className="auth-stat-label">Rating</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Sign Up Form */}
            <div className="auth-form-container">
                <div className="auth-form-wrapper">
                    <div className="auth-form-header">
                        <h2>Create your free account</h2>
                        <p>Already have an account? <Link href="/sign-in" className="auth-link">Sign in</Link></p>
                    </div>

                    <SignUp
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
                        forceRedirectUrl="/onboarding"
                        signInUrl="/sign-in"
                    />

                    <div className="auth-guarantee">
                        <div className="guarantee-icon">🛡️</div>
                        <div>
                            <strong>30-Day Money Back Guarantee</strong>
                            <p>Not satisfied? Get a full refund, no questions asked.</p>
                        </div>
                    </div>

                    <div className="auth-trust-badges">
                        <div className="trust-badge">
                            <span className="trust-icon">🔒</span>
                            <span>SSL Encrypted</span>
                        </div>
                        <div className="trust-badge">
                            <span className="trust-icon">🚫</span>
                            <span>No Credit Card</span>
                        </div>
                        <div className="trust-badge">
                            <span className="trust-icon">⚡</span>
                            <span>Instant Access</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

'use client';

import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import Navbar from '../components/Navbar';

export default function StudentDashboard() {
    const { user } = useUser();

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-dark)', paddingTop: '100px' }}>
            <Navbar />
            <div className="section-container" style={{ padding: '2rem' }}>
                <div style={{ marginBottom: '3rem' }}>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
                        Welcome back, {user?.firstName}! 👋
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                        Continue your guitar learning journey
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem',
                    marginBottom: '3rem'
                }}>
                    <div className="feature-card" style={{ padding: '2rem' }}>
                        <h3 style={{ marginBottom: '1rem' }}>📚 My Courses</h3>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                            You haven't enrolled in any courses yet.
                        </p>
                        <Link href="/courses" className="btn-primary">
                            Browse Courses
                        </Link>
                    </div>

                    <div className="feature-card" style={{ padding: '2rem' }}>
                        <h3 style={{ marginBottom: '1rem' }}>📈 Progress</h3>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <div style={{
                                height: '8px',
                                background: 'var(--border)',
                                borderRadius: '4px',
                                overflow: 'hidden'
                            }}>
                                <div style={{
                                    height: '100%',
                                    width: '0%',
                                    background: 'var(--accent)',
                                    transition: 'width 0.3s'
                                }}></div>
                            </div>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                                0% Complete
                            </p>
                        </div>
                    </div>

                    <div className="feature-card" style={{ padding: '2rem' }}>
                        <h3 style={{ marginBottom: '1rem' }}>⏱️ Practice Time</h3>
                        <p style={{
                            fontSize: '2.5rem',
                            fontWeight: 'bold',
                            color: 'var(--accent)',
                            marginBottom: '0.5rem'
                        }}>
                            0h
                        </p>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                            This week
                        </p>
                    </div>
                </div>

                <div className="feature-card" style={{ padding: '2.5rem', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
                        Ready to start learning?
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
                        Browse our collection of guitar courses taught by expert instructors.
                        From beginner basics to advanced techniques.
                    </p>
                    <Link href="/courses" className="btn-primary" style={{ display: 'inline-flex' }}>
                        Explore Courses →
                    </Link>
                </div>
            </div>
        </div>
    );
}

'use client';

import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import Navbar from '../../components/Navbar';

export default function InstructorDashboard() {
    const { user } = useUser();

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-dark)', paddingTop: '100px' }}>
            <Navbar />
            <div className="section-container" style={{ padding: '2rem' }}>
                <div style={{ marginBottom: '3rem' }}>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
                        Instructor Dashboard
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                        Welcome, {user?.firstName}! Manage your courses and students here.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '2rem',
                    marginBottom: '3rem'
                }}>
                    <div className="feature-card" style={{ padding: '2rem' }}>
                        <h3 style={{ marginBottom: '1rem' }}>📚 My Courses</h3>
                        <p style={{
                            fontSize: '3rem',
                            fontWeight: 'bold',
                            color: 'var(--accent)',
                            marginBottom: '0.5rem'
                        }}>
                            0
                        </p>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                            Published courses
                        </p>
                    </div>

                    <div className="feature-card" style={{ padding: '2rem' }}>
                        <h3 style={{ marginBottom: '1rem' }}>👥 Students</h3>
                        <p style={{
                            fontSize: '3rem',
                            fontWeight: 'bold',
                            color: 'var(--accent)',
                            marginBottom: '0.5rem'
                        }}>
                            0
                        </p>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                            Total enrollments
                        </p>
                    </div>

                    <div className="feature-card" style={{ padding: '2rem' }}>
                        <h3 style={{ marginBottom: '1rem' }}>💰 Revenue</h3>
                        <p style={{
                            fontSize: '3rem',
                            fontWeight: 'bold',
                            color: 'var(--accent)',
                            marginBottom: '0.5rem'
                        }}>
                            $0
                        </p>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                            This month
                        </p>
                    </div>

                    <div className="feature-card" style={{ padding: '2rem' }}>
                        <h3 style={{ marginBottom: '1rem' }}>⭐ Rating</h3>
                        <p style={{
                            fontSize: '3rem',
                            fontWeight: 'bold',
                            color: 'var(--accent)',
                            marginBottom: '0.5rem'
                        }}>
                            --
                        </p>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                            Average rating
                        </p>
                    </div>
                </div>

                <div className="feature-card" style={{ padding: '2.5rem', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
                        Create Your First Course
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
                        Share your guitar expertise with students around the world. Create engaging video lessons,
                        build comprehensive modules, and help others master the guitar.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <button className="btn-primary" style={{ display: 'inline-flex' }}>
                            + Create New Course
                        </button>
                        <button className="btn-secondary" style={{ display: 'inline-flex' }}>
                            View Course Guidelines
                        </button>
                    </div>
                </div>

                <div style={{ marginTop: '3rem' }}>
                    <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem' }}>Quick Actions</h2>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '1.5rem'
                    }}>
                        <div className="feature-card" style={{ padding: '1.5rem', cursor: 'pointer' }}>
                            <h4 style={{ marginBottom: '0.5rem' }}>📹 Upload Video</h4>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                Add new video lessons to your courses
                            </p>
                        </div>
                        <div className="feature-card" style={{ padding: '1.5rem', cursor: 'pointer' }}>
                            <h4 style={{ marginBottom: '0.5rem' }}>📊 View Analytics</h4>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                See how your courses are performing
                            </p>
                        </div>
                        <div className="feature-card" style={{ padding: '1.5rem', cursor: 'pointer' }}>
                            <h4 style={{ marginBottom: '0.5rem' }}>💬 Student Messages</h4>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                Respond to student questions
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

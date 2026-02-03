'use client';

import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import { useState, useEffect } from 'react';

export default function StudentDashboard() {
    const { user, isLoaded } = useUser();
    const [courses, setCourses] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchEnrolledCourses = async () => {
            try {
                const res = await fetch('/api/user/courses');
                if (res.ok) {
                    const data = await res.json();
                    setCourses(data);
                }
            } catch (error) {
                console.error('Failed to fetch enrolled courses:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (isLoaded && user) {
            fetchEnrolledCourses();
        }
    }, [isLoaded, user]);

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
                        <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span>📚</span> My Learning
                        </h3>
                        <p style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--accent)', marginBottom: '0.5rem' }}>
                            {courses.length}
                        </p>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                            Active courses
                        </p>
                    </div>

                    <div className="feature-card" style={{ padding: '2rem' }}>
                        <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span>📈</span> Technique Score
                        </h3>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                            <p style={{ fontSize: '3rem', fontWeight: 'bold', color: '#10b981', marginBottom: '0.5rem' }}>
                                +12%
                            </p>
                            <span style={{ fontSize: '0.8rem', color: '#10b981' }}>this month</span>
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                            <div style={{ height: '8px', background: 'var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
                                <div style={{ height: '100%', width: '68%', background: '#10b981', transition: 'width 0.3s' }}></div>
                            </div>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                                68% Overall Proficiency
                            </p>
                        </div>
                    </div>

                    <div className="feature-card" style={{ padding: '2rem' }}>
                        <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span>⏱️</span> Practice Time
                        </h3>
                        <p style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--accent)', marginBottom: '0.5rem' }}>
                            14.5h
                        </p>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                            Tracked this week
                        </p>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', marginTop: '3rem' }}>
                    <div>
                        <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem' }}>Continue Learning</h2>
                        {isLoading ? (
                            <p>Loading your courses...</p>
                        ) : courses.length > 0 ? (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                                {courses.map((course) => (
                                    <Link key={course.id} href={`/courses/${course.id}`} className="feature-card" style={{ padding: '0', overflow: 'hidden', textDecoration: 'none', color: 'white' }}>
                                        <div style={{
                                            width: '100%',
                                            height: '160px',
                                            background: course.imageUrl ? `url(${course.imageUrl}) center/cover` : '#333'
                                        }} />
                                        <div style={{ padding: '1.5rem' }}>
                                            <h3 style={{ marginBottom: '0.5rem' }}>{course.title}</h3>
                                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                                                By {course.instructor?.name || 'Instructor'}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="feature-card" style={{ padding: '4rem', textAlign: 'center' }}>
                                <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Ready to start?</h2>
                                <Link href="/courses" className="btn-primary">Explore Courses</Link>
                            </div>
                        )}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem' }}>Your Goals</h2>
                        <div className="feature-card" style={{ padding: '1.5rem' }}>
                            <h4 style={{ marginBottom: '1rem' }}>Daily Consistency</h4>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                                    <div key={day + i} style={{
                                        flex: 1,
                                        height: '40px',
                                        borderRadius: '8px',
                                        background: i < 5 ? 'var(--accent)' : 'var(--bg-elevated)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: i < 5 ? 'black' : 'var(--text-muted)',
                                        fontSize: '0.8rem',
                                        fontWeight: 'bold'
                                    }}>
                                        {day}
                                    </div>
                                ))}
                            </div>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '1rem' }}>5 day streak! Keep it up 🔥</p>
                        </div>

                        <div className="feature-card" style={{ padding: '1.5rem' }}>
                            <h4 style={{ marginBottom: '1rem' }}>Quick Actions</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <Link href="/ai-feedback" className="btn-secondary" style={{ padding: '0.6rem', fontSize: '0.9rem', textAlign: 'center' }}>
                                    Launch AI Feedback
                                </Link>
                                <Link href="/library" className="btn-secondary" style={{ padding: '0.6rem', fontSize: '0.9rem', textAlign: 'center' }}>
                                    Open Song Library
                                </Link>
                                <Link href="/community" className="btn-secondary" style={{ padding: '0.6rem', fontSize: '0.9rem', textAlign: 'center' }}>
                                    Join Community
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';

export default function CoursesPage() {
    const [courses, setCourses] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCatalog = async () => {
            try {
                const res = await fetch('/api/catalog');
                if (res.ok) {
                    const data = await res.json();
                    setCourses(data);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCatalog();
    }, []);

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-dark)', paddingTop: '100px' }}>
            <Navbar />
            <div className="section-container" style={{ padding: '2rem' }}>
                <div style={{ marginBottom: '3rem' }}>
                    <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem' }}>Explore Courses</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>
                        The best guitar courses taught by world-class instructors.
                    </p>
                </div>

                {isLoading ? (
                    <div style={{ textAlign: 'center', padding: '5rem', color: 'white' }}>Loading catalog...</div>
                ) : courses.length > 0 ? (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                        gap: '2.5rem'
                    }}>
                        {courses.map((course) => (
                            <Link
                                href={`/courses/${course.id}`}
                                key={course.id}
                                className="feature-card"
                                style={{
                                    padding: '0',
                                    overflow: 'hidden',
                                    textDecoration: 'none',
                                    color: 'white',
                                    transition: 'transform 0.3s'
                                }}
                            >
                                <div style={{
                                    width: '100%',
                                    height: '180px',
                                    background: course.imageUrl ? `url(${course.imageUrl}) center/cover` : '#333',
                                }} />
                                <div style={{ padding: '1.5rem' }}>
                                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{course.title}</h3>
                                    <p style={{
                                        color: 'var(--text-secondary)',
                                        fontSize: '0.9rem',
                                        marginBottom: '1.5rem',
                                        display: '-webkit-box',
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden'
                                    }}>
                                        {course.description || 'No description provided.'}
                                    </p>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--accent)' }} />
                                            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                                {course.instructor?.name || 'Instructor'}
                                            </span>
                                        </div>
                                        <span style={{ fontWeight: 'bold', color: 'var(--accent)' }}>
                                            {course.price ? `$${course.price}` : 'Free'}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="feature-card" style={{ padding: '5rem', textAlign: 'center' }}>
                        <h2>No courses available yet.</h2>
                        <p style={{ color: 'var(--text-secondary)' }}>Check back soon for new content!</p>
                    </div>
                )}
            </div>
        </div>
    );
}

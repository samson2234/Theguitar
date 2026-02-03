'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Navbar from '../../components/Navbar';
import { useUser } from '@clerk/nextjs';

export default function CourseDetailPage() {
    const { courseId } = useParams();
    const { isSignedIn, user } = useUser();
    const router = useRouter();
    const [course, setCourse] = useState<any>(null);
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isEnrolling, setIsEnrolling] = useState(false);

    useEffect(() => {
        fetchCourse();
        if (isSignedIn) {
            checkEnrollment();
        }
    }, [courseId, isSignedIn]);

    const fetchCourse = async () => {
        try {
            const res = await fetch(`/api/catalog`);
            if (res.ok) {
                const catalog = await res.json();
                const found = catalog.find((c: any) => c.id === courseId);
                setCourse(found);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const checkEnrollment = async () => {
        try {
            const res = await fetch(`/api/courses/${courseId}/enroll`);
            if (res.ok) {
                const data = await res.json();
                setIsEnrolled(data.isEnrolled);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const onEnroll = async () => {
        if (!isSignedIn) {
            router.push('/sign-in');
            return;
        }

        setIsEnrolling(true);
        try {
            const res = await fetch(`/api/courses/${courseId}/enroll`, {
                method: 'POST',
            });
            if (res.ok) {
                setIsEnrolled(true);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsEnrolling(false);
        }
    };

    if (isLoading) return <div style={{ color: 'white', padding: '100px', textAlign: 'center' }}>Loading...</div>;
    if (!course) return <div style={{ color: 'white', padding: '100px', textAlign: 'center' }}>Course not found</div>;

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-dark)', paddingTop: '100px', color: 'white' }}>
            <Navbar />
            <div className="section-container" style={{ padding: '2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem' }}>
                    {/* Left Column: Course Info */}
                    <div>
                        <div style={{
                            width: '100%',
                            height: '400px',
                            background: course.imageUrl ? `url(${course.imageUrl}) center/cover` : '#333',
                            borderRadius: '16px',
                            marginBottom: '2rem'
                        }} />
                        <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem' }}>{course.title}</h1>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--accent)' }} />
                            <div>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Instructor</p>
                                <p style={{ fontWeight: '600' }}>{course.instructor?.name || 'Instructor'}</p>
                            </div>
                        </div>
                        <div style={{ marginBottom: '3rem' }}>
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Description</h2>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '1.1rem' }}>
                                {course.description || 'No description available for this course.'}
                            </p>
                        </div>

                        <div>
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Course Content</h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {course.modules?.map((module: any) => (
                                    <div key={module.id} style={{ background: '#1e1e1e', padding: '1.5rem', borderRadius: '12px', border: '1px solid #333' }}>
                                        <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem' }}>{module.title}</h3>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                            {module.lessons?.map((lesson: any) => (
                                                <div
                                                    key={lesson.id}
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '0.5rem',
                                                        padding: '0.5rem',
                                                        color: isEnrolled || lesson.isFree ? 'white' : 'var(--text-secondary)',
                                                        cursor: isEnrolled || lesson.isFree ? 'pointer' : 'default'
                                                    }}
                                                    onClick={() => {
                                                        if (isEnrolled || lesson.isFree) {
                                                            router.push(`/courses/${courseId}/lessons/${lesson.id}`);
                                                        }
                                                    }}
                                                >
                                                    <span style={{ color: 'var(--accent)' }}>▶</span>
                                                    <span>{lesson.title}</span>
                                                    {lesson.isFree && !isEnrolled && (
                                                        <span style={{ fontSize: '0.7rem', background: 'var(--accent)', color: 'black', padding: '2px 6px', borderRadius: '4px', marginLeft: 'auto' }}>FREE PREVIEW</span>
                                                    )}
                                                    {!isEnrolled && !lesson.isFree && (
                                                        <span style={{ marginLeft: 'auto' }}>🔒</span>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Enrollment Card */}
                    <div>
                        <div className="feature-card" style={{ padding: '2rem', position: 'sticky', top: '120px' }}>
                            <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                                {course.price ? `$${course.price}` : 'Free'}
                            </div>
                            <button
                                onClick={isEnrolled ? () => router.push(`/courses/${courseId}/lessons/first`) : onEnroll}
                                className="btn-primary"
                                style={{ width: '100%', marginBottom: '1rem', padding: '1rem' }}
                                disabled={isEnrolling}
                            >
                                {isEnrolled ? 'Continue Learning' : isEnrolling ? 'Enrolling...' : 'Enroll Now'}
                            </button>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
                                30-Day Money-Back Guarantee
                            </p>
                            <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid #333' }}>
                                <p style={{ fontWeight: '600', marginBottom: '1rem' }}>This course includes:</p>
                                <ul style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                    <li>✓ Unlimited access</li>
                                    <li>✓ Video lessons</li>
                                    <li>✓ Mobile friendly</li>
                                    <li>✓ Certificate of completion</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function InstructorDashboard() {
    const { user, isLoaded } = useUser();
    const router = useRouter();
    const [courses, setCourses] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const userRole = (user?.publicMetadata?.role || user?.unsafeMetadata?.role) as string;

    useEffect(() => {
        if (isLoaded && user && userRole !== 'INSTRUCTOR') {
            router.push('/dashboard');
        }
    }, [isLoaded, user, userRole]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await fetch('/api/courses');
                if (res.ok) {
                    const data = await res.json();
                    setCourses(data);
                }
            } catch (error) {
                console.error('Failed to fetch courses:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (isLoaded && user && userRole === 'INSTRUCTOR') {
            fetchCourses();
        }
    }, [isLoaded, user, userRole]);

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-dark)', paddingTop: '100px' }}>
            <Navbar />
            <div className="section-container" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                    <div>
                        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Instructor Dashboard</h1>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                            Welcome, {user?.firstName}! Manage your courses and students here.
                        </p>
                    </div>
                    <Link href="/instructor/courses/create" className="btn-primary">
                        + Create New Course
                    </Link>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '2rem',
                    marginBottom: '3rem'
                }}>
                    <div className="feature-card" style={{ padding: '2rem' }}>
                        <h3 style={{ marginBottom: '1rem' }}>📚 My Courses</h3>
                        <p style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--accent)', marginBottom: '0.5rem' }}>
                            {courses.length}
                        </p>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                            Total courses created
                        </p>
                    </div>

                    <div className="feature-card" style={{ padding: '2rem' }}>
                        <h3 style={{ marginBottom: '1rem' }}>👥 Students</h3>
                        <p style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--accent)', marginBottom: '0.5rem' }}>
                            0
                        </p>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                            Total enrollments
                        </p>
                    </div>

                    <div className="feature-card" style={{ padding: '2rem' }}>
                        <h3 style={{ marginBottom: '1rem' }}>💰 Revenue</h3>
                        <p style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--accent)', marginBottom: '0.5rem' }}>
                            $0
                        </p>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                            This month
                        </p>
                    </div>
                </div>

                <div style={{ marginTop: '3rem' }}>
                    <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem' }}>Your Courses</h2>
                    {isLoading ? (
                        <p>Loading courses...</p>
                    ) : courses.length > 0 ? (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                            {courses.map((course) => (
                                <div key={course.id} className="feature-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                    <div>
                                        <div style={{
                                            width: '100%',
                                            height: '160px',
                                            background: course.imageUrl ? `url(${course.imageUrl}) center/cover` : '#333',
                                            borderRadius: '8px',
                                            marginBottom: '1rem'
                                        }} />
                                        <h3 style={{ marginBottom: '0.5rem' }}>{course.title}</h3>
                                        <span style={{
                                            display: 'inline-block',
                                            padding: '2px 8px',
                                            borderRadius: '4px',
                                            fontSize: '0.75rem',
                                            background: course.isPublished ? '#10b98122' : '#f59e0b22',
                                            color: course.isPublished ? '#10b981' : '#f59e0b',
                                            marginBottom: '1rem'
                                        }}>
                                            {course.isPublished ? 'Published' : 'Draft'}
                                        </span>
                                    </div>
                                    <Link href={`/instructor/courses/${course.id}`} className="btn-secondary" style={{ textAlign: 'center' }}>
                                        Edit Course
                                    </Link>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="feature-card" style={{ padding: '4rem', textAlign: 'center' }}>
                            <h3 style={{ marginBottom: '1rem' }}>No courses yet</h3>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                                Start sharing your expertise by creating your first guitar course.
                            </p>
                            <Link href="/instructor/courses/create" className="btn-primary">
                                Create Your First Course
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import { useUser } from '@clerk/nextjs';

export default function LessonPlayerPage() {
    const { courseId, lessonId } = useParams();
    const { isSignedIn } = useUser();
    const router = useRouter();
    const [lesson, setLesson] = useState<any>(null);
    const [course, setCourse] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, [courseId, lessonId]);

    const fetchData = async () => {
        try {
            // Fetch course catalog to get syllabus
            const catRes = await fetch('/api/catalog');
            if (catRes.ok) {
                const catalog = await catRes.json();
                const foundCourse = catalog.find((c: any) => c.id === courseId);
                setCourse(foundCourse);

                // Find modern
                let foundLesson = null;
                for (const mod of foundCourse.modules) {
                    const l = mod.lessons.find((les: any) => les.id === lessonId);
                    if (l) {
                        foundLesson = l;
                        break;
                    }
                }
                setLesson(foundLesson);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) return <div style={{ color: 'white', padding: '100px', textAlign: 'center' }}>Loading...</div>;
    if (!lesson) return <div style={{ color: 'white', padding: '100px', textAlign: 'center' }}>Lesson not found</div>;

    // Helper to get YouTube ID
    const getYouTubeId = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url?.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const youtubeId = getYouTubeId(lesson.videoUrl);

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-dark)', paddingTop: '100px', color: 'white' }}>
            <Navbar />
            <div className="section-container" style={{ padding: '0 2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '2rem', height: 'calc(100vh - 150px)' }}>
                    {/* Left: Video Player */}
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{
                            width: '100%',
                            aspectRatio: '16/9',
                            background: 'black',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
                        }}>
                            {youtubeId ? (
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src={`https://www.youtube.com/embed/${youtubeId}`}
                                    title={lesson.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', flexDirection: 'column', gap: '1rem' }}>
                                    <span style={{ fontSize: '3rem' }}>📺</span>
                                    <p>No video available for this lesson.</p>
                                </div>
                            )}
                        </div>
                        <div style={{ marginTop: '2rem' }}>
                            <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{lesson.title}</h1>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                                {lesson.description || 'No additional details for this lesson.'}
                            </p>
                        </div>
                    </div>

                    {/* Right: Sidebar Syllabus */}
                    <div className="feature-card" style={{ padding: '0', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                        <div style={{ padding: '1.5rem', borderBottom: '1px solid #333' }}>
                            <h3 style={{ fontSize: '1.1rem' }}>Syllabus</h3>
                        </div>
                        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
                            {course.modules.map((mod: any) => (
                                <div key={mod.id} style={{ marginBottom: '1.5rem' }}>
                                    <p style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--accent)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                                        {mod.title}
                                    </p>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                                        {mod.lessons.map((les: any) => (
                                            <div
                                                key={les.id}
                                                onClick={() => router.push(`/courses/${courseId}/lessons/${les.id}`)}
                                                style={{
                                                    padding: '0.8rem',
                                                    borderRadius: '8px',
                                                    background: les.id === lessonId ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                                                    fontSize: '0.85rem',
                                                    cursor: 'pointer',
                                                    color: les.id === lessonId ? 'var(--accent)' : 'white'
                                                }}
                                            >
                                                {les.title}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

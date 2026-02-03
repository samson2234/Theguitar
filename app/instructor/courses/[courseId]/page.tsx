'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Navbar from '../../../../components/Navbar';

export default function CourseEditorPage() {
    const { courseId } = useParams();
    const router = useRouter();
    const [course, setCourse] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    // Form states
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [price, setPrice] = useState('');

    // Module state
    const [newModuleTitle, setNewModuleTitle] = useState('');

    useEffect(() => {
        fetchCourse();
    }, [courseId]);

    const fetchCourse = async () => {
        try {
            const res = await fetch(`/api/courses/${courseId}`);
            if (!res.ok) throw new Error('Failed to fetch course');
            const data = await res.json();
            setCourse(data);
            setTitle(data.title);
            setDescription(data.description || '');
            setImageUrl(data.imageUrl || '');
            setPrice(data.price?.toString() || '');
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const onUpdateCourse = async () => {
        setIsSaving(true);
        try {
            const res = await fetch(`/api/courses/${courseId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title,
                    description,
                    imageUrl,
                    price: price ? parseFloat(price) : null,
                }),
            });
            if (res.ok) {
                alert('Course updated successfully!');
                fetchCourse();
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsSaving(false);
        }
    };

    const onAddModule = async () => {
        if (!newModuleTitle) return;
        try {
            const res = await fetch(`/api/courses/${courseId}/modules`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: newModuleTitle }),
            });
            if (res.ok) {
                setNewModuleTitle('');
                fetchCourse();
            }
        } catch (error) {
            console.error(error);
        }
    };

    const onAddLesson = async (moduleId: string) => {
        const lessonTitle = prompt('Enter lesson title:');
        if (!lessonTitle) return;
        try {
            const res = await fetch(`/api/courses/${courseId}/modules/${moduleId}/lessons`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: lessonTitle }),
            });
            if (res.ok) {
                fetchCourse();
            }
        } catch (error) {
            console.error(error);
        }
    };

    if (isLoading) return <div style={{ color: 'white', padding: '100px', textAlign: 'center' }}>Loading...</div>;

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-dark)', paddingTop: '100px', color: 'white' }}>
            <Navbar />
            <div className="section-container" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                    <div>
                        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Course Setup</h1>
                        <p style={{ color: 'var(--text-secondary)' }}>Complete all fields to publish your course</p>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button onClick={onUpdateCourse} className="btn-primary" disabled={isSaving}>
                            {isSaving ? 'Saving...' : 'Save Changes'}
                        </button>
                        <button
                            onClick={async () => {
                                const res = await fetch(`/api/courses/${courseId}`, {
                                    method: 'PATCH',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ isPublished: !course.isPublished }),
                                });
                                if (res.ok) fetchCourse();
                            }}
                            className="btn-secondary"
                            style={{ background: course.isPublished ? '#ef4444' : '#10b981', color: 'white', border: 'none' }}
                        >
                            {course.isPublished ? 'Unpublish' : 'Publish'}
                        </button>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                    {/* Left Column: Basic Info */}
                    <div className="feature-card" style={{ padding: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Basic Information</h2>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Title</label>
                            <input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                style={{ width: '100%', padding: '0.8rem', background: '#1e1e1e', border: '1px solid #333', borderRadius: '8px', color: 'white' }}
                            />
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Description</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={5}
                                style={{ width: '100%', padding: '0.8rem', background: '#1e1e1e', border: '1px solid #333', borderRadius: '8px', color: 'white' }}
                            />
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Thumbnail URL</label>
                            <input
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                style={{ width: '100%', padding: '0.8rem', background: '#1e1e1e', border: '1px solid #333', borderRadius: '8px', color: 'white' }}
                            />
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Price ($)</label>
                            <input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                style={{ width: '100%', padding: '0.8rem', background: '#1e1e1e', border: '1px solid #333', borderRadius: '8px', color: 'white' }}
                            />
                        </div>
                    </div>

                    {/* Right Column: Curriculum */}
                    <div className="feature-card" style={{ padding: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Course Curriculum</h2>

                        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
                            <input
                                placeholder="Module Title"
                                value={newModuleTitle}
                                onChange={(e) => setNewModuleTitle(e.target.value)}
                                style={{ flex: 1, padding: '0.8rem', background: '#1e1e1e', border: '1px solid #333', borderRadius: '8px', color: 'white' }}
                            />
                            <button onClick={onAddModule} className="btn-primary" style={{ padding: '0 1rem' }}>+ Add Module</button>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {course.modules.map((module: any) => (
                                <div key={module.id} style={{ background: '#1e1e1e', padding: '1rem', borderRadius: '12px', border: '1px solid #333' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                        <h3 style={{ fontWeight: '600' }}>{module.title}</h3>
                                        <button onClick={() => onAddLesson(module.id)} style={{ color: 'var(--accent)', cursor: 'pointer', background: 'none', border: 'none' }}>+ Add Lesson</button>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        {module.lessons.map((lesson: any) => (
                                            <div
                                                key={lesson.id}
                                                onClick={() => router.push(`/instructor/courses/${courseId}/lessons/${lesson.id}`)}
                                                style={{ background: '#2a2a2a', padding: '0.8rem', borderRadius: '8px', fontSize: '0.9rem', cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}
                                            >
                                                <span>{lesson.title}</span>
                                                <span style={{ color: 'var(--text-secondary)' }}>Edit →</span>
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

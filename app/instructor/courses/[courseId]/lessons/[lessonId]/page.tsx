'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Navbar from '../../../../../../components/Navbar';

export default function LessonEditorPage() {
    const { courseId, lessonId } = useParams();
    const router = useRouter();
    const [lesson, setLesson] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    // Form states
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [isFree, setIsFree] = useState(false);

    useEffect(() => {
        fetchLesson();
    }, [lessonId]);

    const fetchLesson = async () => {
        try {
            const res = await fetch(`/api/courses/${courseId}/lessons/${lessonId}`);
            if (!res.ok) throw new Error('Failed to fetch lesson');
            const data = await res.json();
            setLesson(data);
            setTitle(data.title);
            setDescription(data.description || '');
            setVideoUrl(data.videoUrl || '');
            setIsFree(data.isFree || false);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const onUpdateLesson = async () => {
        setIsSaving(true);
        try {
            const res = await fetch(`/api/courses/${courseId}/lessons/${lessonId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title,
                    description,
                    videoUrl,
                    isFree,
                }),
            });
            if (res.ok) {
                alert('Lesson updated successfully!');
                router.push(`/instructor/courses/${courseId}`);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) return <div style={{ color: 'white', padding: '100px', textAlign: 'center' }}>Loading...</div>;

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-dark)', paddingTop: '100px', color: 'white' }}>
            <Navbar />
            <div className="section-container" style={{ maxWidth: '800px', padding: '2rem' }}>
                <div style={{ marginBottom: '3rem' }}>
                    <button
                        onClick={() => router.push(`/instructor/courses/${courseId}`)}
                        style={{ color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                        ← Back to course setup
                    </button>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Edit Lesson</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Add content and video to your lesson</p>
                </div>

                <div className="feature-card" style={{ padding: '2.5rem' }}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Lesson Title</label>
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
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Video URL (YouTube or Vimeo)</label>
                        <input
                            value={videoUrl}
                            onChange={(e) => setVideoUrl(e.target.value)}
                            placeholder="https://www.youtube.com/watch?v=..."
                            style={{ width: '100%', padding: '0.8rem', background: '#1e1e1e', border: '1px solid #333', borderRadius: '8px', color: 'white' }}
                        />
                    </div>

                    <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <input
                            type="checkbox"
                            id="isFree"
                            checked={isFree}
                            onChange={(e) => setIsFree(e.target.checked)}
                            style={{ width: '20px', height: '20px' }}
                        />
                        <label htmlFor="isFree">Make this lesson free for preview</label>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                        <button onClick={onUpdateLesson} className="btn-primary" disabled={isSaving}>
                            {isSaving ? 'Saving...' : 'Save Lesson'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

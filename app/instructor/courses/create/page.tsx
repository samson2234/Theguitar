'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../../components/Navbar';

export default function CreateCoursePage() {
    const [title, setTitle] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title) return;

        setIsLoading(true);
        try {
            const response = await fetch('/api/courses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title }),
            });

            if (!response.ok) {
                throw new Error('Failed to create course');
            }

            const course = await response.json();
            router.push(`/instructor/courses/${course.id}`);
        } catch (error) {
            console.error(error);
            alert('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-dark)', paddingTop: '100px' }}>
            <Navbar />
            <div className="section-container" style={{ maxWidth: '600px', padding: '2rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Name your course</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        What would you like to name your course? Don't worry, you can change this later.
                    </p>
                </div>

                <form onSubmit={onSubmit} className="feature-card" style={{ padding: '2.5rem' }}>
                    <div style={{ marginBottom: '2rem' }}>
                        <label
                            htmlFor="title"
                            style={{
                                display: 'block',
                                marginBottom: '0.8rem',
                                fontWeight: '600',
                                fontSize: '1.1rem'
                            }}
                        >
                            Course Title
                        </label>
                        <input
                            id="title"
                            type="text"
                            placeholder="e.g. 'Advanced Blues Guitar Masterclass'"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            disabled={isLoading}
                            style={{
                                width: '100%',
                                padding: '1rem',
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid var(--border)',
                                borderRadius: '12px',
                                color: 'white',
                                fontSize: '1rem'
                            }}
                        />
                        <p style={{
                            fontSize: '0.85rem',
                            color: 'var(--text-secondary)',
                            marginTop: '0.5rem'
                        }}>
                            Aim for a descriptive and catchy title.
                        </p>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="btn-secondary"
                            disabled={isLoading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn-primary"
                            disabled={!title || isLoading}
                        >
                            {isLoading ? 'Creating...' : 'Continue'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

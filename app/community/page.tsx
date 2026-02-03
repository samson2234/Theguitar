'use client';

import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const posts = [
    { id: 1, user: "GuitarHero22", content: "Just mastered the F Barré chord! It took me 3 weeks but I finally got it clear. Any tips on switching to it faster?", likes: 24, comments: 12, time: "2h ago" },
    { id: 2, user: "BluesMaster", content: "Check out this awesome blues lick I found in the new Advanced module. The bending technique is key here.", likes: 45, comments: 5, time: "5h ago" },
    { id: 3, user: "AcousticLover", content: "Thinking of buying a new Martin D-28. Anyone here has experience with it vs a Taylor 814ce?", likes: 18, comments: 31, time: "1d ago" },
];

export default function CommunityPage() {
    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-dark)', paddingTop: '100px' }}>
            <Navbar />
            <div className="section-container" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
                    <div>
                        <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem' }}>Community</h1>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>
                            Connect, share, and learn with 50,000+ guitarists.
                        </p>
                    </div>
                    <button className="btn-primary">+ Create Post</button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '2rem' }}>
                    {/* Main Feed */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {posts.map((post) => (
                            <div key={post.id} className="feature-card" style={{ padding: '2rem' }}>
                                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--accent)' }} />
                                    <div>
                                        <h4 style={{ fontSize: '1rem' }}>{post.user}</h4>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{post.time}</p>
                                    </div>
                                </div>
                                <p style={{ fontSize: '1.1rem', marginBottom: '2rem', lineHeight: '1.6' }}>{post.content}</p>
                                <div style={{ display: 'flex', gap: '2rem', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
                                    <button style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <span>❤️</span> {post.likes}
                                    </button>
                                    <button style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <span>💬</span> {post.comments}
                                    </button>
                                    <button style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <span>🔗</span> Share
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Sidebar */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div className="feature-card" style={{ padding: '1.5rem' }}>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Trending Topics</h3>
                            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                <li style={{ color: 'var(--accent)', cursor: 'pointer' }}>#BarréChordChallenge</li>
                                <li style={{ color: 'var(--accent)', cursor: 'pointer' }}>#NewGuitarDay</li>
                                <li style={{ color: 'var(--accent)', cursor: 'pointer' }}>#BluesScaleTips</li>
                                <li style={{ color: 'var(--accent)', cursor: 'pointer' }}>#BeginnerMistakes</li>
                            </ul>
                        </div>

                        <div className="feature-card" style={{ padding: '1.5rem' }}>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Top Instructors</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#3b82f6' }} />
                                    <span style={{ fontSize: '0.9rem' }}>Marcus Chen</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#ec4899' }} />
                                    <span style={{ fontSize: '0.9rem' }}>Sarah Williams</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

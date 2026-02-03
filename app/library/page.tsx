'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Link from 'next/link';

const songs = [
    { id: 1, title: "Wonderwall", artist: "Oasis", difficulty: "Beginner", category: "Rock" },
    { id: 2, title: "Wish You Were Here", artist: "Pink Floyd", difficulty: "Intermediate", category: "Classic Rock" },
    { id: 3, title: "Blackbird", artist: "The Beatles", difficulty: "Advanced", category: "Acoustic" },
    { id: 4, title: "Hotel California", artist: "Eagles", difficulty: "Advanced", category: "Classic Rock" },
    { id: 5, title: "Fast Car", artist: "Tracy Chapman", difficulty: "Intermediate", category: "Folk" },
    { id: 6, title: "Little Wing", artist: "Jimi Hendrix", difficulty: "Advanced", category: "Blues" },
];

export default function LibraryPage() {
    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-dark)', paddingTop: '100px' }}>
            <Navbar />
            <div className="section-container" style={{ padding: '2rem' }}>
                <div style={{ marginBottom: '3rem' }}>
                    <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem' }}>Song Library</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>
                        Browse tabs, chords, and backing tracks for your favorite songs.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                    gap: '2rem'
                }}>
                    {songs.map((song) => (
                        <div key={song.id} className="feature-card" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <h3 style={{ marginBottom: '0.25rem' }}>{song.title}</h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>{song.artist}</p>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <span style={{
                                        padding: '2px 8px',
                                        background: 'rgba(255,255,255,0.05)',
                                        borderRadius: '4px',
                                        fontSize: '0.7rem',
                                        color: song.difficulty === 'Beginner' ? '#10b981' : song.difficulty === 'Intermediate' ? '#f59e0b' : '#ef4444'
                                    }}>
                                        {song.difficulty}
                                    </span>
                                    <span style={{ padding: '2px 8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', fontSize: '0.7rem' }}>
                                        {song.category}
                                    </span>
                                </div>
                            </div>
                            <button className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>
                                View Tabs
                            </button>
                        </div>
                    ))}
                </div>

                <div className="feature-card" style={{ marginTop: '4rem', padding: '3rem', textAlign: 'center' }}>
                    <h2>Want to learn a specific song?</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Our instructors add 5 new songs every week. Request a song below!</p>
                    <button className="btn-primary">Request a Song</button>
                </div>
            </div>
        </div>
    );
}

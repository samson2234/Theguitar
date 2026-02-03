'use client';

import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';

export default function AIFeedbackPage() {
    const [isListening, setIsListening] = useState(false);
    const [feedback, setFeedback] = useState<string | null>(null);
    const [volume, setVolume] = useState<number[]>(new Array(20).fill(0));

    // Mock AI feedback loop
    useEffect(() => {
        let interval: any;
        if (isListening) {
            interval = setInterval(() => {
                setVolume(new Array(20).fill(0).map(() => Math.random() * 100));
            }, 100);

            // Mock a feedback after 5 seconds
            setTimeout(() => {
                if (isListening) {
                    setFeedback("Great tone! Your G major chord is perfectly in tune. Try pressing a bit harder on the 5th string to avoid that subtle buzz.");
                }
            }, 4000);
        } else {
            setVolume(new Array(20).fill(0));
        }
        return () => clearInterval(interval);
    }, [isListening]);

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-dark)', paddingTop: '100px' }}>
            <Navbar />
            <div className="section-container" style={{ maxWidth: '800px', padding: '2rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem' }}>AI Feedback</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>
                        Play your guitar and get real-time feedback on your technique, tuning, and timing.
                    </p>
                </div>

                <div className="feature-card" style={{ padding: '3rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: '4px', height: '100px' }}>
                        {volume.map((v, i) => (
                            <div
                                key={i}
                                style={{
                                    width: '8px',
                                    height: `${v}%`,
                                    background: v > 0 ? 'var(--accent)' : 'rgba(255,255,255,0.1)',
                                    borderRadius: '4px',
                                    transition: 'height 0.1s ease',
                                    opacity: 0.5 + (v / 200)
                                }}
                            />
                        ))}
                    </div>

                    {!feedback ? (
                        <button
                            onClick={() => setIsListening(!isListening)}
                            className={isListening ? "btn-secondary" : "btn-primary"}
                            style={{
                                width: '200px',
                                height: '200px',
                                borderRadius: '50%',
                                fontSize: '1.2rem',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto',
                                gap: '1rem',
                                border: isListening ? '4px solid var(--accent)' : 'none',
                                animation: isListening ? 'pulse 2s infinite' : 'none'
                            }}
                        >
                            <span style={{ fontSize: '3rem' }}>{isListening ? '🛑' : '🎤'}</span>
                            {isListening ? 'Listening...' : 'Start Session'}
                        </button>
                    ) : (
                        <div style={{ animation: 'fadeIn 0.5s ease' }}>
                            <div style={{
                                background: 'rgba(245, 158, 11, 0.1)',
                                border: '1px solid var(--accent)',
                                padding: '2rem',
                                borderRadius: '16px',
                                marginBottom: '2rem',
                                textAlign: 'left'
                            }}>
                                <h3 style={{ color: 'var(--accent)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span>✨</span> AI Analysis Result
                                </h3>
                                <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>{feedback}</p>
                            </div>
                            <button
                                onClick={() => { setFeedback(null); setIsListening(false); }}
                                className="btn-secondary"
                            >
                                Try Another Note/Chord
                            </button>
                        </div>
                    )}

                    <style jsx>{`
                        @keyframes pulse {
                            0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.4); }
                            70% { transform: scale(1.05); box-shadow: 0 0 0 20px rgba(245, 158, 11, 0); }
                            100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(245, 158, 11, 0); }
                        }
                        @keyframes fadeIn {
                            from { opacity: 0; transform: translateY(10px); }
                            to { opacity: 1; transform: translateY(0); }
                        }
                    `}</style>
                </div>
            </div>
        </div>
    );
}

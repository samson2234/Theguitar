"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

// Constants from original script
const STRINGS = 6;
const FRETS = 8;
const STRING_NOTES = ["E4", "B3", "G3", "D3", "A2", "E2"];
const NOTE_NAMES = [
    "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"
];

const CHORDS: Record<string, { frets: number[]; fingers: (number | null)[] }> = {
    C: {
        frets: [-1, 1, 0, 2, 3, -1],
        fingers: [null, 1, null, 2, 3, null],
    },
    G: {
        frets: [3, 0, 0, 0, 2, 3],
        fingers: [2, null, null, null, 1, 3],
    },
    Am: {
        frets: [0, 1, 2, 2, 0, -1],
        fingers: [null, 1, 2, 3, null, null],
    },
    F: {
        frets: [1, 1, 2, 3, 3, 1],
        fingers: [1, 1, 2, 3, 4, 1],
    },
    D: {
        frets: [2, 3, 2, 0, -1, -1],
        fingers: [1, 3, 2, null, null, null],
    },
    Em: {
        frets: [0, 0, 0, 2, 2, 0],
        fingers: [null, null, null, 1, 2, null],
    },
};

type SongNote = [number, number, number]; // [string, fret, duration]
const SONGS: Record<string, { name: string; tempo: number; notes: SongNote[] }> = {
    greensleeves: {
        name: "Greensleeves",
        tempo: 400,
        notes: [
            [2, 0, 1], [1, 1, 1], [0, 3, 2], [0, 5, 1], [0, 3, 1], [0, 1, 2],
            [1, 0, 1], [2, 0, 1], [1, 1, 2], [2, 0, 1], [1, 1, 1], [0, 0, 2],
            [0, 0, 1], [1, 0, 1], [0, 1, 2], [0, 3, 1], [0, 5, 1], [0, 3, 2],
            [0, 1, 1], [1, 0, 1], [2, 0, 2], [1, 1, 1], [2, 0, 1], [1, 1, 2],
        ],
    },
    houseoftherisingsun: {
        name: "House of the Rising Sun",
        tempo: 350,
        notes: [
            [4, 0, 1], [3, 2, 1], [2, 2, 1], [1, 1, 1], [2, 2, 1], [3, 2, 1],
            [4, 2, 1], [3, 2, 1], [2, 0, 1], [1, 1, 1], [2, 0, 1], [3, 2, 1],
            [4, 0, 1], [3, 2, 1], [2, 1, 1], [1, 0, 1], [2, 1, 1], [3, 2, 1],
            [4, 2, 1], [3, 2, 1], [2, 2, 1], [1, 1, 1], [2, 2, 1], [3, 2, 1],
        ],
    },
    amazinggrace: {
        name: "Amazing Grace",
        tempo: 500,
        notes: [
            [3, 0, 1], [2, 0, 2], [1, 1, 1], [2, 0, 1], [1, 1, 2], [1, 0, 1],
            [2, 0, 3], [3, 2, 1], [3, 0, 2], [2, 0, 1], [1, 1, 1], [2, 0, 1],
            [1, 1, 2], [0, 0, 1], [0, 3, 3], [0, 3, 1], [0, 0, 2], [1, 1, 1],
            [2, 0, 1], [1, 1, 2], [1, 0, 1], [2, 0, 3],
        ],
    },
};

export default function GuitarInterface() {
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSongKey, setCurrentSongKey] = useState("greensleeves");
    const [activeChord, setActiveChord] = useState<string | null>(null);

    // To track which notes are visually active: key="string-fret"
    const [activeNotes, setActiveNotes] = useState<Set<string>>(new Set());
    const [playingNotes, setPlayingNotes] = useState<Set<string>>(new Set()); // For animation

    const audioCtxRef = useRef<AudioContext | null>(null);
    const compressorRef = useRef<DynamicsCompressorNode | null>(null);
    const songTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const noteIndexRef = useRef(0);
    const isPlayingRef = useRef(false); // Ref for immediate access in timeout

    // Initialize AudioContext
    const getAudioContext = useCallback(() => {
        if (!audioCtxRef.current) {
            const Ctx = window.AudioContext || (window as any).webkitAudioContext;
            if (Ctx) {
                audioCtxRef.current = new Ctx();
                compressorRef.current = audioCtxRef.current!.createDynamicsCompressor();
                compressorRef.current.threshold.value = -24;
                compressorRef.current.knee.value = 30;
                compressorRef.current.ratio.value = 12;
                compressorRef.current.attack.value = 0.003;
                compressorRef.current.release.value = 0.25;
                compressorRef.current.connect(audioCtxRef.current!.destination);
            }
        }
        if (audioCtxRef.current?.state === "suspended") {
            audioCtxRef.current.resume();
        }
        return audioCtxRef.current;
    }, []);

    const getFrequency = (string: number, fret: number) => {
        const baseFreqs = [329.63, 246.94, 196.00, 146.83, 110.00, 82.41];
        return baseFreqs[string] * Math.pow(2, fret / 12);
    };

    const getNoteName = (string: number, fret: number) => {
        const baseNote = STRING_NOTES[string];
        const baseNoteIndex = NOTE_NAMES.indexOf(baseNote.slice(0, -1).replace("b", "#"));
        const noteIndex = (baseNoteIndex + fret + 1) % 12;
        return NOTE_NAMES[noteIndex];
    };

    const playNote = useCallback((string: number, fret: number, showMarker = true) => {
        if (showMarker) {
            const key = `${string}-${fret}`;
            setPlayingNotes((prev) => new Set(prev).add(key));
            setTimeout(() => {
                setPlayingNotes((prev) => {
                    const next = new Set(prev);
                    next.delete(key);
                    return next;
                });
            }, 300);
        }

        if (!soundEnabled) return;

        try {
            const ctx = getAudioContext();
            if (!ctx || !compressorRef.current) return;

            const freq = getFrequency(string, fret);

            const osc1 = ctx.createOscillator();
            const osc2 = ctx.createOscillator();
            const gainNode = ctx.createGain();
            const filter = ctx.createBiquadFilter();

            osc1.type = "triangle";
            osc2.type = "sine";
            osc1.frequency.value = freq;
            osc2.frequency.value = freq * 2;

            filter.type = "lowpass";
            filter.frequency.value = 1800;
            filter.Q.value = 0.7;

            osc1.connect(filter);
            osc2.connect(filter);
            filter.connect(gainNode);
            gainNode.connect(compressorRef.current);

            const now = ctx.currentTime;
            gainNode.gain.setValueAtTime(0.001, now);
            gainNode.gain.exponentialRampToValueAtTime(0.15, now + 0.015);
            gainNode.gain.exponentialRampToValueAtTime(0.08, now + 0.1);
            gainNode.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

            osc1.start(now);
            osc2.start(now);
            osc1.stop(now + 1.2);
            osc2.stop(now + 1.2);
        } catch (e) {
            console.error("Audio error:", e);
        }
    }, [soundEnabled, getAudioContext]);

    const clearNotes = useCallback(() => {
        setActiveNotes(new Set());
        setActiveChord(null);
    }, []);

    const showChord = useCallback((chordName: string) => {
        // Stop any playing song
        stopSong();

        clearNotes();
        setActiveChord(chordName);

        const chord = CHORDS[chordName];
        const newActiveNotes = new Set<string>();
        const notesToPlay: { string: number; fret: number }[] = [];

        chord.frets.forEach((fret, string) => {
            if (fret >= 0) {
                const actualFret = fret === 0 ? 0 : fret - 1;
                newActiveNotes.add(`${string}-${actualFret}`);
                notesToPlay.push({ string, fret: actualFret });
            }
        });

        setActiveNotes(newActiveNotes);

        if (soundEnabled) {
            notesToPlay.reverse().forEach((note, i) => {
                setTimeout(() => playNote(note.string, note.fret, false), i * 40);
            });
        }
    }, [clearNotes, soundEnabled, playNote]); // Added stopSong later

    // Define stopSong properly
    const stopSong = useCallback(() => {
        isPlayingRef.current = false;
        setIsPlaying(false);
        if (songTimeoutRef.current) {
            clearTimeout(songTimeoutRef.current);
            songTimeoutRef.current = null;
        }
        noteIndexRef.current = 0;

        // Reset progress bar visually if needed (can be state)
        clearNotes();
    }, [clearNotes]);

    // We need to move showChord after stopSong or hoist stopSong. 
    // Since we used variables, we can't hoist fully. 
    // Let's just fix showChord dependency by using a ref or just calling setIsPlaying(false) directly inside showChord? 
    // Actually, showChord needs to call stopSong, so stopSong must be defined before showChord or use a ref. 
    // I'll stick to calling explicit cleanup in showChord.

    const playNextNote = useCallback(() => {
        if (!isPlayingRef.current) return;

        const song = SONGS[currentSongKey];
        if (noteIndexRef.current >= song.notes.length) {
            stopSong();
            return;
        }

        const [string, fret, duration] = song.notes[noteIndexRef.current];

        // Clear previous visual notes for song (but we might want to keep them lit for a moment? Original code cleared them)
        // "Clear previous and play current"
        // Original: clearNotes(); const fretEl = ...
        // Note: React state update might be too slow for 1ms updates if we clear and set instantly.
        // Ideally we just set the new set of active notes.

        const newActiveNotes = new Set<string>();
        newActiveNotes.add(`${string}-${fret}`);
        setActiveNotes(newActiveNotes);

        // Play sound
        playNote(string, fret, false);
        // Add visual playing effect
        setPlayingNotes(prev => new Set(prev).add(`${string}-${fret}`));
        setTimeout(() => {
            setPlayingNotes(prev => {
                const n = new Set(prev);
                n.delete(`${string}-${fret}`);
                return n;
            });
        }, 300);

        noteIndexRef.current++;

        songTimeoutRef.current = setTimeout(playNextNote, song.tempo * duration);
    }, [currentSongKey, playNote, stopSong]);

    const handlePlaySong = () => {
        if (isPlaying) {
            stopSong();
            return;
        }

        getAudioContext();
        isPlayingRef.current = true;
        setIsPlaying(true);
        noteIndexRef.current = 0;
        playNextNote();
    };

    // Fix circular dependency: showChord uses stopSong
    const handleChordClick = (chordName: string) => {
        stopSong();
        showChord(chordName);
    };

    // Progress bar calculation
    const songProgress = isPlaying
        ? ((noteIndexRef.current) / SONGS[currentSongKey].notes.length) * 100
        : 0;
    // Note: noteIndexRef updates ahead of render, so progress might be jumpy without state. 
    // For smoother progress, we might need a state that updates with the note.
    // But let's stick to simple for now. Actually, if I don't set state, progress bar won't re-render.
    // I should add a setCurrentProgress state.

    const [progress, setProgress] = useState(0);

    // Intercept playNextNote to update progress
    // Redefining playNextNote to include setProgress

    // Let's allow the user to click to initialize audio
    useEffect(() => {
        const initAudio = () => getAudioContext();
        window.addEventListener('click', initAudio, { once: true });
        return () => window.removeEventListener('click', initAudio);
    }, [getAudioContext]);

    // Custom useEffect for progress update during song
    useEffect(() => {
        if (isPlaying) {
            setProgress(((noteIndexRef.current) / SONGS[currentSongKey].notes.length) * 100);
        } else {
            setProgress(0);
        }
    }, [activeNotes, isPlaying, currentSongKey]); // activeNotes changes on every note in the song

    return (
        <div className="guitar-wrapper">
            <div className="guitar-card">
                <div className="guitar-header">
                    <span className="guitar-title">Try it — Click a chord</span>
                    <div className="guitar-controls">
                        {Object.keys(CHORDS).map((chord) => (
                            <button
                                key={chord}
                                className={`chord-btn ${activeChord === chord ? "active" : ""}`}
                                onClick={() => handleChordClick(chord)}
                            >
                                {chord}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="guitar-neck">
                    <div className="fretboard">
                        <div className="nut"></div>
                        <div className="fretboard-grid" id="fretboard">
                            <div className="string-labels">
                                {STRING_NOTES.map((_, i) => (
                                    // Logic to show matching note names for standard tuning?
                                    // CSS handles rendering labels E B G D A E via separate divs
                                    // We can just render them here.
                                    // The CSS expects 6 divs.
                                    <div key={i} className="string-label">{STRING_NOTES[i].slice(0, -1)}</div>
                                ))}
                            </div>

                            {/* Generate Grid */}
                            {/* CSS: grid-template-columns: repeat(8, 1fr); rows: repeat(6, 32px); */}
                            {/* The JS loop was: string 0..5, then fret 0..7 */}
                            {/* We need to output div.fret in that order */}
                            {Array.from({ length: STRINGS }).flatMap((_, string) =>
                                Array.from({ length: FRETS }).map((_, fret) => {
                                    const noteName = getNoteName(string, fret);
                                    const isMarker = string === 2 && [2, 4, 6].includes(fret);
                                    const isActive = activeNotes.has(`${string}-${fret}`);
                                    const isPlayingAnim = playingNotes.has(`${string}-${fret}`);

                                    return (
                                        <div
                                            key={`${string}-${fret}`}
                                            className="fret"
                                            data-string={string}
                                            data-fret={fret}
                                            onClick={() => playNote(string, fret)}
                                        >
                                            {isMarker && <div className="fret-marker"></div>}
                                            <div className={`note-marker ${isActive ? "show" : ""} ${isPlayingAnim ? "playing" : ""}`}>
                                                {noteName}
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>
                </div>
                <div className="guitar-footer">
                    <div className="guitar-footer-row">
                        <span className="guitar-hint">Click frets to play notes</span>
                        <div className="footer-controls">
                            <button className="clear-btn" onClick={() => { stopSong(); clearNotes(); }}>Clear</button>
                            <div className="sound-toggle" onClick={() => { setSoundEnabled(!soundEnabled); if (!soundEnabled) getAudioContext(); }}>
                                <span>Sound</span>
                                <div className={`toggle-switch ${soundEnabled ? "active" : ""}`}></div>
                            </div>
                        </div>
                    </div>
                    <div className="song-player">
                        <button
                            className={`play-btn ${isPlaying ? "playing" : ""}`}
                            onClick={handlePlaySong}
                        >
                            {isPlaying ? "■" : "▶"}
                        </button>
                        <div className="song-info">
                            <div className="song-title">{SONGS[currentSongKey].name}</div>
                            <div className="song-progress">
                                <div className="song-progress-bar" style={{ width: `${progress}%` }}></div>
                            </div>
                        </div>
                        <select
                            className="song-select"
                            value={currentSongKey}
                            onChange={(e) => { stopSong(); setCurrentSongKey(e.target.value); }}
                        >
                            <option value="greensleeves">Greensleeves</option>
                            <option value="houseoftherisingsun">House of the Rising Sun</option>
                            <option value="amazinggrace">Amazing Grace</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}

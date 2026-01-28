"use client";

import React, { useState } from "react";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav>
            <div className="nav-container">
                <a href="#" className="logo">
                    <div className="logo-icon">♪</div>
                    StringMaster
                </a>
                <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
                    <li><a href="#features" onClick={() => setIsMenuOpen(false)}>Features</a></li>
                    <li><a href="#pricing" onClick={() => setIsMenuOpen(false)}>Pricing</a></li>
                    <li><a href="#instructors" onClick={() => setIsMenuOpen(false)}>Instructors</a></li>
                    <li><a href="#testimonials" onClick={() => setIsMenuOpen(false)}>Reviews</a></li>
                </ul>
                <a
                    href="#pricing"
                    className={`nav-cta ${isMenuOpen ? "active" : ""}`}
                    style={isMenuOpen ? { top: 'calc(100% + 200px)' } : {}} // Simplification, original JS calculated height
                >
                    <span>Start Free Trial</span>
                </a>
                <button
                    className="mobile-menu-btn"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? "✕" : "☰"}
                </button>
            </div>
        </nav>
    );
}

import React from "react";
import Navbar from "./components/Navbar";
import GuitarInterface from "./components/GuitarInterface";
import Pricing from "./components/Pricing";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="hero" id="hero">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <span>●</span> New: AI-powered chord recognition
            </div>
            <h1>
              Master guitar with <span className="highlight">interactive</span> lessons
            </h1>
            <p className="hero-description">
              Learn at your own pace with our visual fretboard trainer. From
              beginner chords to advanced techniques — all in one platform.
            </p>
            <div className="hero-buttons">
              <a href="#pricing" className="btn-primary">
                Start Learning →
              </a>
              <a href="#features" className="btn-secondary">
                See How It Works
              </a>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <div className="stat-value">50K+</div>
                <div className="stat-label">Active Students</div>
              </div>
              <div className="stat">
                <div className="stat-value">200+</div>
                <div className="stat-label">Video Lessons</div>
              </div>
              <div className="stat">
                <div className="stat-value">4.9</div>
                <div className="stat-label">App Rating</div>
              </div>
            </div>
          </div>

          <GuitarInterface />
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <div className="section-container">
          <div className="section-header">
            <div className="section-label">Features</div>
            <h2 className="section-title">Everything you need to learn guitar</h2>
            <p className="section-description">
              Our platform combines visual learning with hands-on practice to
              accelerate your guitar journey.
            </p>
          </div>
          <div className="features-grid">
            <Link href="#hero" className="feature-card" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="feature-icon">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M11.5 2a8.5 8.5 0 0 1 0 17v3l-3-3-3 3v-3a8.5 8.5 0 0 1 6-16z" />
                  <circle cx="11.5" cy="10.5" r="3" />
                  <path d="M11.5 7.5v-2M14.5 10.5h2M11.5 13.5v2M8.5 10.5h-2" />
                </svg>
              </div>
              <h3>Interactive Fretboard</h3>
              <p>
                Visual chord diagrams that show exactly where to place your
                fingers. Practice anywhere, anytime.
              </p>
            </Link>
            <Link href="/courses" className="feature-card" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="feature-icon">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="4" width="20" height="14" rx="2" />
                  <circle cx="12" cy="11" r="3" />
                  <path d="M10.5 9.5l4 3-4 3z" fill="currentColor" />
                </svg>
              </div>
              <h3>HD Video Lessons</h3>
              <p>
                200+ professionally filmed lessons from beginner basics to
                advanced techniques.
              </p>
            </Link>
            <Link href="/dashboard" className="feature-card" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="feature-icon">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 8v4l2 2" />
                </svg>
              </div>
              <h3>Progress Tracking</h3>
              <p>
                Set goals, track your practice time, and watch your skills
                improve over time.
              </p>
            </Link>
            <Link href="/library" className="feature-card" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="feature-icon">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 18V5l12-2v13" />
                  <circle cx="6" cy="18" r="3" />
                  <circle cx="18" cy="16" r="3" />
                  <path d="M9 9l12-2" />
                </svg>
              </div>
              <h3>Song Library</h3>
              <p>
                Learn your favorite songs with tabs, chords, and play-along
                backing tracks.
              </p>
            </Link>
            <Link href="/ai-feedback" className="feature-card" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="feature-icon">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  <line x1="12" y1="19" x2="12" y2="22" />
                  <path d="M8 22h8" />
                  <path d="M3 10l1.5 1.5M21 10l-1.5 1.5M3 14l1.5-1.5M21 14l-1.5-1.5" />
                </svg>
              </div>
              <h3>AI Feedback</h3>
              <p>
                Get real-time feedback on your playing through our audio
                recognition technology.
              </p>
            </Link>
            <Link href="/community" className="feature-card" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="feature-icon">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3>Community</h3>
              <p>
                Connect with fellow learners, share progress, and get tips from
                experienced players.
              </p>
            </Link>
          </div>
        </div>
      </section>

      <Pricing />

      {/* Instructors Section */}
      <section className="instructors" id="instructors">
        <div className="section-container">
          <div className="section-header">
            <div className="section-label">Instructors</div>
            <h2 className="section-title">Learn from the best</h2>
            <p className="section-description">
              Our instructors have decades of combined experience and a passion
              for teaching.
            </p>
          </div>
          <div className="instructors-grid">
            <div className="instructor-card">
              <div className="instructor-image">
                <Image
                  src="/images/acoustic-specialist.jpg"
                  alt="Marcus Chen"
                  width={300}
                  height={300}
                  className="w-full h-full object-cover"
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
              <div className="instructor-name">Marcus Chen</div>
              <div className="instructor-role">Acoustic Specialist</div>
              <p className="instructor-bio">
                15 years teaching, Berklee graduate
              </p>
            </div>
            <div className="instructor-card">
              <div className="instructor-image">
                <Image
                  src="/images/fingerstyle-expert.jpg"
                  alt="Sarah Williams"
                  width={300}
                  height={300}
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
              <div className="instructor-name">Sarah Williams</div>
              <div className="instructor-role">Fingerstyle Expert</div>
              <p className="instructor-bio">YouTube educator, 2M subscribers</p>
            </div>
            <div className="instructor-card">
              <div className="instructor-image">
                <Image
                  src="/images/blues-rock-guitar.jpg"
                  alt="James Rodriguez"
                  width={300}
                  height={300}
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
              <div className="instructor-name">James Rodriguez</div>
              <div className="instructor-role">Blues & Rock</div>
              <p className="instructor-bio">Session guitarist, 20+ albums</p>
            </div>
            <div className="instructor-card">
              <div className="instructor-image">
                <Image
                  src="/images/music-theory-instructor.jpg"
                  alt="Emily Park"
                  width={300}
                  height={300}
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
              <div className="instructor-name">Emily Park</div>
              <div className="instructor-role">Music Theory</div>
              <p className="instructor-bio">
                PhD in Music, award-winning educator
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials" id="testimonials">
        <div className="section-container">
          <div className="section-header">
            <div className="section-label">Testimonials</div>
            <h2 className="section-title">What our students say</h2>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-stars">★★★★★</div>
              <p className="testimonial-text">
                "I've tried several apps, but StringMaster's interactive
                fretboard finally made chord transitions click for me. Went from
                zero to playing songs in 3 months!"
              </p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">
                  <Image
                    src="/images/alex-student.jpg"
                    alt="Alex Thompson"
                    width={50}
                    height={50}
                  />
                </div>
                <div>
                  <div className="testimonial-name">Alex Thompson</div>
                  <div className="testimonial-title">Beginner, 4 months</div>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-stars">★★★★★</div>
              <p className="testimonial-text">
                "The AI feedback feature is incredible. It's like having a
                personal instructor available 24/7. My fingerpicking has
                improved dramatically."
              </p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">
                  <Image
                    src="/images/maria-student.jpg"
                    alt="Maria Garcia"
                    width={50}
                    height={50}
                  />
                </div>
                <div>
                  <div className="testimonial-name">Maria Garcia</div>
                  <div className="testimonial-title">Intermediate, 1 year</div>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-stars">★★★★★</div>
              <p className="testimonial-text">
                "Worth every penny. The song library keeps me motivated, and the
                progress tracking shows exactly how far I've come. Highly
                recommend!"
              </p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">
                  <Image
                    src="/images/david-student.jpg"
                    alt="David Kim"
                    width={50}
                    height={50}
                  />
                </div>
                <div>
                  <div className="testimonial-name">David Kim</div>
                  <div className="testimonial-title">Pro subscriber, 8 months</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="section-container cta-content">
          <h2>Ready to start your guitar journey?</h2>
          <p>
            Join 50,000+ students learning guitar the modern way. Start your
            free trial today.
          </p>
          <a href="#pricing" className="btn-primary">
            Start Free Trial →
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-container">
          <div className="footer-grid">
            <div className="footer-brand">
              <a href="#" className="logo">
                <div className="logo-icon">♪</div>
                StringMaster
              </a>
              <p>
                The modern way to learn guitar. Interactive lessons, real-time
                feedback, and a supportive community.
              </p>
            </div>
            <div>
              <h4 className="footer-title">Product</h4>
              <ul className="footer-links">
                <li><a href="#">Features</a></li>
                <li><a href="#">Pricing</a></li>
                <li><a href="#">Song Library</a></li>
                <li><a href="#">Mobile App</a></li>
              </ul>
            </div>
            <div>
              <h4 className="footer-title">Company</h4>
              <ul className="footer-links">
                <li><a href="#">About Us</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="footer-title">Support</h4>
              <ul className="footer-links">
                <li><a href="#">Help Center</a></li>
                <li><a href="#">Community</a></li>
                <li><a href="#">Terms of Service</a></li>
                <li><a href="#">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 StringMaster. All rights reserved.</span>
            <span>
              Developed by{" "}
              <a
                href="https://www.templatemo.com"
                target="_blank"
                rel="nofollow noopener"
              >
                TemplateMo
              </a>
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}

import Link from 'next/link';

export default function CoursesPage() {
    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-dark)', paddingTop: '100px' }}>
            <div className="section-container" style={{ padding: '2rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <div className="section-label">Courses</div>
                    <h1 className="section-title">Discover Guitar Courses</h1>
                    <p className="section-description">
                        Browse our collection of expertly crafted guitar courses. From beginner to advanced.
                    </p>
                </div>

                <div className="feature-card" style={{
                    padding: '4rem 2rem',
                    textAlign: 'center',
                    maxWidth: '600px',
                    margin: '0 auto'
                }}>
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎸</div>
                    <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>
                        Course Discovery Coming Soon
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: '1.6' }}>
                        We're building an amazing course browsing experience for you. Soon you'll be able to:
                    </p>
                    <ul style={{
                        textAlign: 'left',
                        color: 'var(--text-secondary)',
                        maxWidth: '400px',
                        margin: '0 auto 2rem',
                        lineHeight: '2'
                    }}>
                        <li>✓ Browse courses by category and skill level</li>
                        <li>✓ Search for specific topics</li>
                        <li>✓ Preview course content</li>
                        <li>✓ Enroll and start learning instantly</li>
                    </ul>
                    <Link href="/" className="btn-primary" style={{ display: 'inline-flex' }}>
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}

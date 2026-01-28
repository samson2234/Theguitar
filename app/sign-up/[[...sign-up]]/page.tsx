import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
    return (
        <div className="auth-container">
            <div className="auth-content">
                <div className="auth-header">
                    <a href="/" className="logo">
                        <div className="logo-icon">♪</div>
                        StringMaster
                    </a>
                    <h1>Start your journey</h1>
                    <p>Join 50,000+ students learning guitar the modern way</p>
                </div>
                <SignUp
                    appearance={{
                        elements: {
                            rootBox: "mx-auto",
                            card: "bg-white shadow-xl rounded-2xl border border-gray-100",
                            headerTitle: "hidden",
                            headerSubtitle: "hidden",
                            socialButtonsBlockButton: "border-2 hover:border-purple-500 transition-colors",
                            formButtonPrimary: "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all",
                            footerActionLink: "text-purple-600 hover:text-purple-700",
                            formFieldInput: "border-2 focus:border-purple-500 transition-colors",
                        }
                    }}
                />
            </div>
        </div>
    );
}

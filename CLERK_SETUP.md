# Clerk Authentication Setup Instructions

## 🔐 Getting Your Clerk API Keys

Follow these steps to set up Clerk authentication:

### Step 1: Create a Clerk Account
1. Go to [https://clerk.com](https://clerk.com)
2. Click "Sign Up" or "Get Started for Free"
3. Create your account

### Step 2: Create an Application
1. After logging in, click "Add Application"
2. Name your application (e.g., "StringMaster" or "Guitar Learning")
3. Select authentication methods:
   - ✅ Email
   - ✅ Google (optional but recommended)
   - ✅ GitHub (optional)
4. Click "Create Application"

### Step 3: Get Your API Keys
1. After creating the application, you'll be redirected to the dashboard
2. In the left sidebar, click on "API Keys"
3. Copy the following keys:
   - **Publishable Key** (starts with `pk_test_...`)
   - **Secret Key** (starts with `sk_test_...`)

### Step 4: Update Your .env File
Open `.env` in your project root and replace the placeholder values:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_actual_key_here
CLERK_SECRET_KEY=sk_test_your_actual_key_here
```

### Step 5: Configure Clerk Settings

#### A. Add Custom User Metadata Field
1. In Clerk Dashboard, go to "User & Authentication" → "Metadata"
2. Add a new metadata field:
   - Field name: `role`
   - Type: `string`
   - Options: `STUDENT`, `INSTRUCTOR`, `ADMIN`

#### B. Set Up Paths (Optional - Already configured in code)
The following paths are already set in your `.env`:
- Sign In URL: `/sign-in`
- Sign Up URL: `/sign-up`
- After Sign In URL: `/dashboard`
- After Sign Up URL: `/onboarding`

### Step 6: Test Your Setup
1. Start your development server:
   ```bash
   npm run dev
   ```
2. Navigate to `http://localhost:3000`
3. Click "Start Free Trial" or "Sign In"
4. You should see the Clerk authentication UI

---

## 📝 Additional Configuration (Optional)

### Enable Social Login
1. In Clerk Dashboard, go to "User & Authentication" → "Social Connections"
2. Enable providers like:
   - Google
   - GitHub
   - Facebook
   - etc.
3. Follow the setup instructions for each provider

### Customize Appearance
You can customize Clerk's appearance to match your brand:
1. Go to "Customization" → "Components"
2. Upload your logo
3. Customize colors and themes

---

## 🚀 What's Next?

After setting up Clerk:
1. Users can sign up and select their role (Student or Instructor)
2. The system will automatically sync users to your database
3. Routes are protected based on authentication status
4. The navbar will show different options for logged-in users

---

## 🆘 Troubleshooting

### Error: "Clerk: Missing publishable key"
- Make sure you've added `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` to your `.env`
- Restart your dev server after adding env variables

### Error: "Invalid API key"
- Double-check that you copied the entire key
- Make sure you're using the correct environment keys (test vs production)

### Users not syncing to database
- Check that your DATABASE_URL is correct
- Make sure you've run `npx prisma generate` and `npx prisma db push`

---

## 📚 Resources
- [Clerk Documentation](https://clerk.com/docs)
- [Clerk Next.js Quickstart](https://clerk.com/docs/quickstarts/nextjs)
- [Clerk User Metadata](https://clerk.com/docs/users/metadata)

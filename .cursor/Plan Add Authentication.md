# Project Plan: Add Authentication to Add-Project Page

## Summary
This plan outlines the steps required to implement secure authentication for the `Add-Project` page (and API), ensuring that only authorized users (the portfolio owner) can add projects using a scalable MongoDB User Model and HttpOnly cookies.

## Detailed Steps

1. **Understand Current Setup**
   - Review the `Projects` page and the existing API endpoints.
   - The application currently lacks an authentication mechanism.

2. **Identify Requirements**
   - We need an **Admin User** concept via a Mongoose schema (`UserModel`) to easily allow future addition of authorized users.
   - We will use **JWT (JSON Web Token)** for stateless authentication.
   - To prevent XSS vulnerabilities, JWTs will be stored in `HttpOnly` cookies rather than `localStorage`.

3. **Design Authentication Flow**
   - Create a `/api/auth/login` endpoint to verify credentials against the DB.
   - Upon successful login, the server will issue an `HttpOnly` cookie containing the JWT.
   - Wrap protected frontend routes with a higher-order component checking auth state via the backend.

4. **Update Frontend Code**
   - Create a `Login.tsx` component and attach it to the `/login` route.
   - Add a `/api/auth/check` check within an `<AuthenticatedRoute>` wrapper to secure the Add Project page functionality.
   - Update `src/api/client.ts` to include `credentials: 'include'` on necessary requests.

5. **Update Backend Code**
   - Install dependencies: `bcrypt`, `cookie-parser`, `jsonwebtoken` (and their types).
   - Create `User` Mongoose model.
   - Add authentication controller (`login`, `logout`, `checkAuth`).
   - Add `verifyAuth` middleware.
   - Refactor the Create Project route (`POST /api/projects`) to use the `verifyAuth` middleware.
   - Create a seed script enhancement to add a default Admin user so you have a way to log in initially.

6. **Test Changes**
   - Test locally using `npm run dev:all`.
   - Ensure the cookie attaches properly on cross-domain or same-domain API calls (checking CORS + Credentials settings).

## Steps Breakdown

### Step 1: Install Dependencies
Run the following in the `backend/` directory:
```bash
npm install bcrypt cookie-parser jsonwebtoken
npm install -D @types/bcrypt @types/cookie-parser @types/jsonwebtoken
```

### Step 2: Update Server Configuration & Models
1. **User Model:** Create `backend/src/models/user.ts` defining `username` and `password` (which will store the bcrypt hash).
2. **Server config:** Update `backend/src/index.ts` to use `cookieParser()` and set CORS `credentials: true`. 
   *Note: Express `Request` types will need to be augmented so `req.userId` doesn't throw a TS error.*

### Step 3: Implement Backend Auth Logic
- Create `backend/src/routes/auth.ts`:
  - `POST /api/auth/login`: Find user, `bcrypt.compare` password, create JWT, return via cookie.
  - `POST /api/auth/logout`: Clear the cookie.
  - `GET /api/auth/check`: Decode JWT to confirm session validity.
- Create `backend/src/middleware/auth.ts`: 
  - `verifyAuth` pulls token from `req.cookies.token`, handles missing/invalid states, and lets valid requests through.

### Step 4: Protect Routes & Seed Admin User
- Import `verifyAuth` into `backend/src/routes/projects.ts` and apply it to the `POST /add` or root `POST` method.
- Update `backend/src/scripts/seed.ts` to insert an Admin user (e.g. username. "admin", password "password123" hashed) if one doesn't exist, to bootstrap your environment.

### Step 5: Update Frontend Code
- **API Client:** Update `src/api/client.ts`. Set `credentials: 'include'` on the `createProject` fetch call. Add functions for `login`, `logout`, and `checkAuth`.
- **UI Components:**
  - `src/components/Login/Login.tsx`: Create a simple, styled login form.
  - `src/components/Auth/AuthenticatedRoute.tsx`: A wrapper that checks `checkAuth` status before rendering its children, otherwise redirecting to `/login`.
- **Router:** Connect the routes in `App.tsx` (or your router configuration).

### Step 6: Test Changes
- Start the server and frontend.
- Attempt to navigate to the Add Project route; check if it redirects.
- Login using the default seeded admin credentials.
- Ensure the `token` cookie appears in Browser Dev Tools > Application > Cookies.
- Add a project to ensure the token is successfully attached and validated by the protected POST route.

## Environment Variables

Add `JWT_SECRET` to the backend `.env` file for JWT signing:
```plaintext
JWT_SECRET=your_super_secret_key_here
```

### Deployment Considerations (Netlify / Render etc.)
1. Add `JWT_SECRET` in your production hosting platform's Environment Variables panel.
2. Make sure your production CORS settings mirror the environment appropriately with `credentials: true`.
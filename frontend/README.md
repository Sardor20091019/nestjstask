# Task Management Web

Standalone Angular client for the NestJS task API. It uses signals, zoneless change detection, Tailwind CSS v4, and a functional HTTP interceptor that sends `user_id` from local storage on every request.

## Run it

1. Run the Nest API on port 3000: `npm run start:dev` from the repository root.
2. Run `npm install` inside this `frontend` directory.
3. Run `npm start` inside this directory and open `http://localhost:4200`.
4. Enter an existing employee user ID in the header. The development server proxies `/api/*` to the Nest application.

For admin-only user changes, enter an administrator ID and select **Get JWT**. The development token endpoint issues a signed token with `{ id, role }`, which the client sends as `Authorization: Bearer <token>`. Configure `JWT_SECRET` in the NestJS environment before deployment.

All read operations deliberately use POST requests. The task table sends `{ title, page, limit }`; the dashboard sends `{ worker_user_id }` to `/tasks/employee-tasks`.

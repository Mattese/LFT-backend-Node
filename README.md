# LFT Backend

A NestJS backend application using Prisma ORM.

## Prerequisites

- Node.js 18 or higher
- npm 9 or higher
- PostgreSQL database

## Running the Application

### Install Dependencies

```bash
npm install
```

### Database Setup

1. Copy `.env.example` to `.env` and configure your database URL:

```bash
cp .env.example .env
```

2. Update the `DATABASE_URL` in `.env` with your PostgreSQL connection string.

3. Run database migrations:

```bash
npm run prisma:migrate
```

### Development Mode

```bash
npm run start:dev
```

The application will start on `http://localhost:8080`

### Production Mode

```bash
npm run build
npm run start:prod
```

## Prisma Commands

- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations in development
- `npm run prisma:migrate:deploy` - Deploy migrations in production
- `npm run prisma:studio` - Open Prisma Studio to view/edit data

## Endpoints

- `GET /user/:id` - Returns user data
- `GET /user` - Returns all users
- `POST /user` - Create a new user
- `PATCH /user/:id` - Update a user
- `DELETE /user/:id` - Delete a user

## Docker

Start the PostgreSQL database:

```bash
npm run dev:db
```

Or run the full stack with Docker Compose:

```bash
npm run docker:up
```

## Testing

Run tests with:

```bash
npm run test
```

Run e2e tests with:

```bash
npm run test:e2e
```

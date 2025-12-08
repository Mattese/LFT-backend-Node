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

### API Documentation

Once the application is running, you can access the interactive Swagger documentation at:

[http://localhost:8080/api](http://localhost:8080/api)

The Swagger UI provides:

- Complete API endpoint documentation
- Interactive testing interface
- Request/response schemas
- Authentication information

### Production Mode

```bash
npm run build
npm run start:prod
```

## Prisma Commands

- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate <name>` - Create and run a new database migration
- `npm run prisma:migrate:deploy` - Deploy migrations in production
- `npm run prisma:migrate:reset` - Reset database and rerun all migrations
- `npm run start:dev:studio` - Run application and open Prisma Studio to view/edit data

## API Endpoints

### Health Check

- `GET /health` - Application health status

### User Management

- `POST /user` - Create a new user
- `GET /user` - Get all users
- `GET /user/:id` - Get user by ID
- `PATCH /user/:id` - Update a user
- `DELETE /user/:id` - Delete a user

### Group Management

- `POST /group` - Create a new group with members

> **Note:** For detailed request/response schemas and to test the API interactively, visit the Swagger documentation at `http://localhost:8080/api`

## Docker

Start the PostgreSQL database:

```bash
npm run dev:db
```

Or run the full stack with Docker Compose:

```bash
npm run docker:up
```

## Email Configuration

This application uses email functionality for user notifications (welcome emails, password resets, etc.).

### Development Setup

For development, the app uses [Ethereal Email](https://ethereal.email/) - a fake SMTP service that captures emails for testing without actually sending them.

1. **Get test credentials:**
   - Visit [https://ethereal.email/](https://ethereal.email/)
   - Click "Create Ethereal Account"
   - Copy the generated credentials

2. **Configure environment variables:**

   Add these to your `.env` or `.env.local` file:

   ```env
   MAIL_HOST=smtp.ethereal.email
   MAIL_PORT=587
   MAIL_USER=your-ethereal-username
   MAIL_PASSWORD=your-ethereal-password
   MAIL_FROM_NAME=LFT App
   MAIL_FROM_ADDRESS=noreply@lft-app.com
   ```

3. **View sent emails:**
   - After triggering an email (e.g., visiting `http://localhost:8080/`), check the console output
   - Ethereal will log a preview URL like: `Preview URL: https://ethereal.email/message/xxxxx`
   - Open this URL in your browser to see the email content
   - Alternatively, log into [https://ethereal.email/messages](https://ethereal.email/messages) with your credentials

### Production Setup

For production, replace Ethereal with a real email service:

## Testing

Run tests with:

```bash
npm run test
```

Run e2e tests with:

```bash
npm run test:e2e
```

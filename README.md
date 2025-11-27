# LFT Backend

A NestJS backend application.

## Prerequisites

- Node.js 18 or higher
- npm 9 or higher

## Running the Application

### Install Dependencies

```bash
npm install
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

## Endpoints

- `GET /user/:id` - Returns user data

## SQLite Database

The application uses SQLite (via better-sqlite3) for data storage. The database file is created automatically at `./data/lftdb.sqlite` when the application starts.

## Testing

Run tests with:

```bash
npm run test
```

Run e2e tests with:

```bash
npm run test:e2e
```

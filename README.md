# LFT Backend

A Spring Boot backend application.

## Prerequisites

- Java 17 or higher
- Gradle 8.5 or higher (or use the included Gradle wrapper)

## Running the Application

### Using Gradle

```bash
./gradlew bootRun
```

The application will start on `http://localhost:8080`

### Building the Application

```bash
./gradlew clean build
```

### Running the JAR

```bash
java -jar build/libs/lft-backend-1.0.0.jar
```

## Endpoints

- `GET /user` - Returns "User"

## H2 Database Console

The H2 database console is available at `http://localhost:8080/h2-console` when the application is running.

Connection details:
- JDBC URL: `jdbc:h2:file:./data/lftdb`
- Username: `sa`
- Password: (leave empty)

## Testing

Run tests with:

```bash
./gradlew test
```

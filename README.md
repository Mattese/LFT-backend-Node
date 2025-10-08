# LFT Backend

A Spring Boot backend application.

## Prerequisites

- Java 17 or higher
- Maven 3.6 or higher

## Running the Application

### Using Maven

```bash
mvn spring-boot:run
```

The application will start on `http://localhost:8080`

### Building the Application

```bash
mvn clean package
```

### Running the JAR

```bash
java -jar target/lft-backend-1.0.0.jar
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
mvn test
```

# Use OpenJDK 17 as the base image
FROM openjdk:21-jdk-slim

# Set working directory
WORKDIR app

# Copy built JAR file (Ensure your Spring Boot builds it first!)
COPY user-service/build/libs/user-service-0.0.1-SNAPSHOT.jar app.jar

# Expose the port your Spring Boot app runs on (match it with `application.properties`)
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]

plugins {
    id("java-library")
    id("org.springframework.boot") version "3.3.5"
    id("io.spring.dependency-management") version "1.1.6"
}

group = "org.example"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()
}

dependencies {
    // JPA dependency, needed for entity annotations
    api("org.hibernate.orm:hibernate-core:6.1.0.Final") // Version compatible with your setup
    api("org.springframework.boot:spring-boot-starter-security")
    // Jakarta Persistence for JPA annotations
    api("jakarta.persistence:jakarta.persistence-api:3.0.0")

    // Lombok for generated methods (e.g., getters, setters)
    api("org.projectlombok:lombok:1.18.30") // Only needed at compile time
    annotationProcessor("org.projectlombok:lombok:1.18.30")

    // Testing (optional, if you plan to add tests for shared entities)
    testImplementation(platform("org.junit:junit-bom:5.10.0"))
    testImplementation("org.junit.jupiter:junit-jupiter")
}

tasks.test {
    useJUnitPlatform()
}
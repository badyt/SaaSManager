import org.openapitools.generator.gradle.plugin.tasks.GenerateTask
import org.springframework.boot.gradle.tasks.bundling.BootJar
import java.util.*

plugins {
    java
    id("org.springframework.boot") version "3.3.5"
    id("org.openapi.generator") version "7.7.0"
    id("io.spring.dependency-management") version "1.1.6"
    id("org.flywaydb.flyway") version "10.0.0"
}

group = "com.example"
version = "0.0.1-SNAPSHOT"

java {
    toolchain {
        languageVersion = JavaLanguageVersion.of(21)
    }
}

buildscript {
    repositories {
        mavenCentral()
    }
    dependencies {
        classpath("org.postgresql:postgresql:42.7.4")
        classpath("org.flywaydb:flyway-database-postgresql:10.4.1") // PostgreSQL JDBC driver for Flyway plugin
    }
}

springBoot {
    mainClass.set("org.example.MainApplication") // Replace with your actual main class package and name
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    implementation("org.springframework.boot:spring-boot-starter-security")
    implementation("org.springdoc:springdoc-openapi-starter-webmvc-ui:2.1.0")
    implementation("org.openapitools:jackson-databind-nullable:0.2.4")
    implementation ("org.postgresql:postgresql:42.7.4")
    implementation("org.flywaydb:flyway-database-postgresql:10.4.1")
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    implementation("org.mapstruct:mapstruct:1.5.3.Final")
    implementation("org.springframework.boot:spring-boot-starter-validation")
    implementation("io.jsonwebtoken:jjwt-api:0.11.5")
    implementation("io.jsonwebtoken:jjwt-impl:0.11.5")
    implementation("io.jsonwebtoken:jjwt-jackson:0.11.5")
    annotationProcessor("org.mapstruct:mapstruct-processor:1.5.3.Final")
    testRuntimeOnly("org.junit.platform:junit-platform-launcher")
    testImplementation("org.springframework.boot:spring-boot-starter-test")
    annotationProcessor("org.projectlombok:lombok")
    annotationProcessor("org.projectlombok:lombok-mapstruct-binding:0.2.0")
    implementation(project(":shared-module"))
}

tasks.withType<Test> {
    useJUnitPlatform()
}

val generatedSourcesPath = layout.buildDirectory.dir("generated").get().asFile.path
val apiDescriptionFilesPath = "$rootDir/user-service/src/main/resources/specification"

val generateTasks = file(apiDescriptionFilesPath).listFiles { file ->
    file.extension == "yaml" || file.extension == "yml"
}?.map { specFile ->
    val specName = specFile.nameWithoutExtension
    val apiPackageName = "com.example.${specName}.api"
    val modelPackageName = "com.example.${specName}.model"

    tasks.register("generate${specName.replaceFirstChar { if (it.isLowerCase()) it.titlecase(Locale.getDefault()) else it.toString() }}Api", GenerateTask::class) {
        generatorName.set("spring")
        inputSpec.set(specFile.absolutePath)
        outputDir.set(generatedSourcesPath)
        apiPackage.set(apiPackageName)
        modelPackage.set(modelPackageName)
        configOptions.set(
            mapOf(
                "interfaceOnly" to "true",
                "useSpringBoot3" to "true"
            )
        )
    }
} ?: emptyList()

// Register a parent task to depend on all dynamically created tasks
tasks.register("generateOpenApiCode") {
    dependsOn(generateTasks)
}

sourceSets["main"].java.srcDir("$generatedSourcesPath/src/main/java")

tasks.withType<JavaCompile> {
    dependsOn("generateOpenApiCode")
}

flyway {
//    cleanDisabled = false
    url = System.getenv("SPRING_DATASOURCE_URL") ?: "jdbc:postgresql://localhost:5432/SaaSDatabase"
    user = System.getenv("SPRING_DATASOURCE_USERNAME") ?: "postgres"
    password = System.getenv("SPRING_DATASOURCE_PASSWORD") ?: "password"
    schemas = listOf("public").toTypedArray()
    locations = listOf("filesystem:src/main/resources/db/migration").toTypedArray()
}

tasks.withType<BootJar> {
    mainClass.set("org.example.MainApplication")
}

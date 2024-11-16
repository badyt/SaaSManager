plugins {
    id("java")
    id("org.springframework.boot") version "3.3.5"
    id("org.openapi.generator") version "7.7.0"
    id("io.spring.dependency-management") version "1.1.6"
}

group = "org.example"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()
}

dependencies {

    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.boot:spring-boot-starter-security")
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    implementation("io.jsonwebtoken:jjwt-api:0.11.5")
    implementation("io.jsonwebtoken:jjwt-impl:0.11.5")
    implementation("io.jsonwebtoken:jjwt-jackson:0.11.5")
    implementation("org.springframework.boot:spring-boot-starter-mail") // For email verification
    implementation("org.springdoc:springdoc-openapi-ui:1.6.11") // For OpenAPI documentation
    implementation("org.springframework.boot:spring-boot-starter-validation") // For validation
    implementation("org.postgresql:postgresql") // For PostgreSQL database
    compileOnly("org.projectlombok:lombok")
    annotationProcessor("org.projectlombok:lombok")
    testImplementation(platform("org.junit:junit-bom:5.10.0"))
    testImplementation("org.junit.jupiter:junit-jupiter")
    implementation(project(":shared-module"))
}

tasks.withType<Test> {
    useJUnitPlatform()
}
val generatedSourcesPath = layout.buildDirectory.dir("generated").get().asFile.path
val apiDescriptionFile = "$rootDir/auth-service/src/main/resources/specification/api-spec.yaml"

openApiGenerate {
    generatorName.set("spring")
    inputSpec.set(apiDescriptionFile)
    outputDir.set(generatedSourcesPath)
    apiPackage.set("com.example.api")    // Set your API package
    modelPackage.set("com.example.model") // Set your Model package
    configOptions.set(
        mapOf(
            "useSpringBoot3" to "true",
            "interfaceOnly" to "true"
        )
    )
    typeMappings.set(mapOf("integer" to "Long"))
}

sourceSets["main"].java.srcDir("$generatedSourcesPath/src/main/java")

tasks.withType<JavaCompile> {
    dependsOn("openApiGenerate")
}

FROM adoptopenjdk/openjdk11:jdk-11.0.8_10-alpine
VOLUME /tmp
EXPOSE 8080
ADD target/test-0.0.1-SNAPSHOT.jar test.jar
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/test.jar"]
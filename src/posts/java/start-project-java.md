# 자바로 백엔드 시작하기

자바 언어로 백엔드 API를 만들어보겠습니다.

시작에 앞서 자바 version 17, IntelliJ IDEA Community 최신 버전을 설치해주세요.

자바같은 경우에는 환경변수도 추가해주세요.

`ex) 시스템변수 => 새로 만들기 => 변수 이름 = JAVA_HOME / 변수 값 = C:\Program Files\Java\jdk-17`

다음으로 IntelliJ 를 실행시키고 새 프로젝트를 만들어주세요.
적당한 폴더 이름과 경로를 잘 지정해주고 언어는 자바, 빌드시스템은 Gradle, JDK는 17 (Oracle OpenJDK), Gradle DSL은 Groovy로 설정해주세요.

`src/main/java/org.example` 경로에 들어와서 Application.java 클래스를 생성해주세요. org.example 폴더 오른쪽클릭 => new => Java Class 를 누르고 파일 이름을 적으면 됩니다. 스프링부트로 실행시킬 메인 파일을 생성하는 것입니다.

`build.gradle` 파일을 찾아서 다음 문구를 추가해주세요.

```groovy
plugins {
    id 'org.springframework.boot' version '3.0.1'
    id 'io.spring.dependency-management' version '1.1.0'
}

dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-web'
}

springBoot {
    mainClass = 'org.example.Application'
}

```

::: tip

```
id 'org.springframework.boot' version '3.0.1' 이란 프로젝트를 Spring Boot 프로젝트로 설정하고, 해당 버전의 Spring Boot를 사용하겠다는 의미입니다. 따라서 Spring Boot 프로젝트를 생성하고 관리할 때는 이러한 플러그인 설정을 사용하여 Spring Boot의 기능들을 활용할 수 있습니다.

1. 자동 설정: Spring Boot 프로젝트를 생성하면 기본적으로 필요한 의존성과 설정들이 자동으로 추가됩니다. 예를 들어, spring-boot-starter-web 의존성을 추가하면 웹 애플리케이션을 개발할 때 필요한 여러 라이브러리들이 자동으로 추가됩니다.

2. 실행 가능한 JAR 파일 생성: Spring Boot는 실행 가능한 JAR 파일을 생성할 수 있습니다. 이 JAR 파일에는 애플리케이션 실행에 필요한 모든 의존성이 포함되어 있으며, java -jar 명령으로 간단하게 실행할 수 있습니다.

3. 의존성 관리: Spring Boot는 BOM (Bill of Materials)을 사용하여 의존성 버전을 관리합니다. BOM을 통해 각 의존성들의 버전을 일일이 명시하지 않고도 일관성 있게 버전을 관리할 수 있습니다.

4. DevTools: 개발을 보다 편리하게 하기 위한 도구들을 제공합니다. 예를 들어, 코드 변경 감지와 자동 재시작 등의 기능이 포함됩니다.

5. 프로파일 지원: 다양한 프로파일을 사용하여 환경별로 다른 설정을 쉽게 적용할 수 있습니다.

6. 기타: 많은 기능들이 Spring Boot Gradle 플러그인을 통해 제공되며, 개발 생산성과 애플리케이션의 실행과 배포를 보다 편리하게 만드는데 도움이 됩니다.


id 'io.spring.dependency-management' version '1.1.0' 이란 Spring Boot 프로젝트의 의존성 관리를 간편하게 해주는 유틸리티 플러그인입니다.
io.spring.dependency-management 플러그인을 사용하면 각 의존성들의 버전을 일일이 명시하지 않고도 Spring Boot의 BOM에 정의된 버전들을 사용할 수 있게 됩니다. 이렇게 함으로써 버전 관리를 간편하게 하고 호환성을 보장할 수 있습니다.


implementation 'org.springframework.boot:spring-boot-starter-web' 은 웹 애플리케이션 개발을 위한 스타터 의존성으로서 다음과 같은 기능들을 포함하고 있습니다:

1. Spring Web: 스프링 프레임워크에서 제공하는 웹 개발 관련 기능들을 포함합니다.

2. Spring Web MVC: 스프링의 웹 MVC 프레임워크로서 웹 애플리케이션의 컨트롤러와 뷰를 지원합니다.

3. Tomcat: 내장형 Tomcat 웹 서버를 사용하여 웹 애플리케이션을 실행할 수 있도록 합니다.

4. 기타: 여러 웹 관련 라이브러리들을 포함하여 웹 애플리케이션 개발에 필요한 기본적인 환경을 제공합니다.
```

:::

build.gradle 파일을 수정할때마다 우측 상단부분에 reload를 해야만할거같은 작은 버튼이 생기는데 수정할때마다 눌러주세요.

`Application.java` 를 다음 코드로 입력해주세요.

````java
package org.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}```


다음으로 org.example 폴더에서 controller 폴더를 만들고, TestController.java 를 만들고 다음 코드를 입력해주세요.

```java
package org.example.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {
    @GetMapping("/test")
    public String test() {
        return "Hello API!";
    }
}
````

이후 Application.java 에서 프로젝트를 실행시켜주세요.

`http://localhost:8080/test` 경로에 들어가서 `Hello API!` 문구가 정상적으로 출력되면 성공입니다.

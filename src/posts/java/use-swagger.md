# 자바 프로젝트에서 스웨거 사용하기

<a href="https://springdoc.org/#getting-started" target="_blank">
Spring Doc
</a>에서 자세한 내용을 확인할 수 있습니다.

build.gradle 에서 다음 문구를 추가해주세요.

```groovy
dependencies {
    implementation 'org.springdoc:springdoc-openapi-starter-webmvc-ui:2.1.0'
}
```

::: tip

implementation 'org.springdoc:springdoc-openapi-starter-webmvc-ui:2.1.0'는 스프링 부트 애플리케이션에 Springdoc OpenAPI 라이브러리의 웹 MVC UI 기능을 추가하기 위한 의존성(dependency)을 선언하는 것입니다.

Springdoc OpenAPI는 스프링 프레임워크를 사용하여 OpenAPI 또는 Swagger 스펙으로 API 문서를 자동으로 생성하는 도구입니다. 이를 통해 API를 더 쉽게 문서화하고, API의 기능과 요청/응답을 쉽게 이해할 수 있도록 도와줍니다.

implementation은 Gradle 빌드 스크립트에서 사용되는 구성(configuration)의 하나입니다. 이것은 컴파일 및 런타임에 필요한 의존성을 선언할 때 사용되며, 프로젝트가 해당 라이브러리를 실제로 사용한다는 것을 의미합니다.

따라서 위의 구문은 프로젝트에 Springdoc OpenAPI 라이브러리의 웹 MVC UI 기능을 사용하기 위해 필요한 의존성을 추가하는 것입니다.

:::

그리고 다시 프로젝트를 실행시키고 `http://localhost:8080/swagger-ui/index.html` 로 들어가서 스웨거 UI가 잘 나오는지 확인해주세요.

`TestController.java`

```java
package org.example.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import io.swagger.v3.oas.annotations.Operation;

@RestController
public class TestController {
    @GetMapping("/test")
    @Operation(summary = "Test API", description = "This API is a sample API.")
    public String test() {
        return "Hello API!";
    }
}
```

@Operation을 추가하여 API에 대한 설명을 추가할 수 있습니다.

## Custom path 사용하기

src/main/resources 폴더에 `application.yml` 을 만들고 다음 문구를 넣어주세요.

```yml
springdoc:
  swagger-ui:
    path: /custom-path
```

`http://localhost:8080/custom-path` 로 접속이 잘 되면 성공입니다.

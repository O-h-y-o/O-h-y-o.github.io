# IntelliJ Java Spring boot MongoDB 연결하기

간단하게 자바 스프링부트로 MongoDB에 연결하여 유저가 몇 명 있는지 카운트하는 API를 만들어보겠습니다.

<a href="https://account.mongodb.com/account/login" target="_blank">
MongoDB
</a> 계정이 없다면 만들어주고, 로그인을 해줍니다.

처음 가입하는 것이면 여러가지 질문사항들이 있는데 해당사항에 잘 체크해주고 회원가입을 마쳐주세요.

회원가입을 하면 바로 프로젝트를 만드는 페이지로 이동되는데 여기서도 잘 읽어보고 설정해주세요. 테스트 혹은 개발용이니 M0 무료 티어로 생성해주세요. 추후에 변경 가능하니 고민을 많이할 필요는 없습니다.

프로젝트를 생성했다면 화면 중앙에 생성한 프로젝트가 보일 건데, 이중 Connect를 눌러줍니다. 여러가지 연결 방법이 있는데, 이중 Compass를 이용하겠습니다.

MongoDB Compass 가 설치되어있지 않다면 `I don't have MongoDB Compass installed` 를 선택하여 운영체제에 맞는 버전을 설치해주고, connection string을 입력하여 MongoDB에 연결해줍니다.

설치되어있다면 `I have MongoDB Compass installed` 를 선택하여 connection string을 입력하여 MongoDB에 연결해줍니다.

IntelliJ에서 MongoDB를 사용할 프로젝트에 다음 코드들을 입력해줍니다.

```groovy
// build.gradle
dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-data-mongodb'
}
```

```yml
# ex) src/main/resources/application.yml
spring:
  data:
    mongodb:
      uri: <MongoDB 연결에 사용했던 connection string>/<사용할 데이터베이스 이름>
      # ex) mongodb+srv://name:password@<dataBaseID>.mongodb.net/<databaseName>
```

```java
// ex) src/main/java/org/main/repository/UserRepository.java
package org.main.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.main.model.UserModel;

public interface UserRepository extends MongoRepository<UserModel, String> {
}
```

```java
// ex) src/main/java/org/main/service/UserService.java

package org.main.service;

import org.main.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // User 수를 가져오는 함수
    public long getTotalUserCount() {
        return userRepository.count();
    }
}
```

```java
// ex) src/main/java/org/main/controller/UserController.java
package org.main.controller;

import org.main.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.Operation;


@RestController
@RequestMapping("/api/user")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/count")
    @Operation(summary = "Get all user count", description = "type: number")
    public long getTotalUserCount() {
        return userService.getTotalUserCount();
    }
}
```

스웨거나 포스트맨 혹은 구현한 웹페이지에서 해당 API를 테스트하면 MongoDB에서 유저의 수를 가져올 수 있습니다.

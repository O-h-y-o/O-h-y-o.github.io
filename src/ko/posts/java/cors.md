# Java Spring boot CORS 허용하기

자바 스프링부트 프로젝트에서 CORS를 허용하는 방법입니다.

```java
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600);
    }
}
```

CorsConfig 클래스에서 addCorsMappings() 메서드를 오버라이드하여 CORS 관련 설정을 합니다.

모든 경로("/\*_")에 대해 모든 Origin(allowedOrigins("_"))에서의 GET, POST, PUT, DELETE, OPTIONS 메서드 요청을 허용하도록 설정하고 있습니다.

allowedHeaders("\*")는 모든 허용된 요청 헤더를 나타냅니다.

allowCredentials(true)는 자격 증명(즉, 쿠키, 인증 헤더 등)을 허용하도록 설정합니다.

maxAge(3600)는 프리플라이(pre-flight) 요청의 최대 지속 시간을 설정합니다(여기서는 1시간으로 설정됨).

이제 위에서 만든 CorsConfig 설정이 적용되어 Spring Boot 애플리케이션이 CORS 요청을 허용하게 됩니다.

::: tip

참고: 실제 운영환경에서는 보안을 위해 allowedOrigins를 필요한 도메인으로 한정하는 것이 좋습니다. 위의 예제에서는 allowedOrigins("\*")로 설정하여 모든 Origin으로부터 요청을 허용하도록 하였지만, 실제 운영환경에서는 필요한 도메인만 허용하도록 설정하는 것이 안전합니다.

:::

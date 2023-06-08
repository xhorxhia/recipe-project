package recipes.config;

import org.springframework.boot.web.servlet.MultipartConfigFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.unit.DataSize;

import javax.servlet.MultipartConfigElement;

@Configuration
public class MultipartFileConfig {
    @Bean
    public MultipartConfigElement multipartConfigElement() {
        // What each factory setting does is better described here.
        // https://docs.spring.io/spring-boot/docs/current/api/org/springframework/boot/web/servlet/MultipartConfigFactory.html
        MultipartConfigFactory factory = new MultipartConfigFactory();
        // This is a useful setting when receiving a single MultipartFile item in a single FormData request from the Client.
        // Not as useful for an Image File turned into a Base64 String.
        factory.setMaxFileSize(DataSize.parse("30MB"));
        // This is a useful setting when receiving multiple MultipartFile items in a single FormData request from the Client.
        // Once again, not as useful for Image Files turned into Base64 Strings.
        factory.setMaxRequestSize(DataSize.parse("30MB"));
        return factory.createMultipartConfig();
    }
}

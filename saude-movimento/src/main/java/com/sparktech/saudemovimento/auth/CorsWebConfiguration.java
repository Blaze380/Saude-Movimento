package com.sparktech.saudemovimento.auth;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * CorsRegistry class, can make the application more secure by block or allow
 * specific CRUD methods, origins, and so on.
 */
@Configuration
@EnableWebMvc
public class CorsWebConfiguration implements WebMvcConfigurer {

    /**
     * PLEASE!!! Don't forget to the correct CORS settings!
     */
    public void addCorsMappings(CorsRegistry corsRegistry) {
        corsRegistry.addMapping("/**");
    }
}

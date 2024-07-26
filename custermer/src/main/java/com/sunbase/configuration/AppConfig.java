package com.sunbase.configuration;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.cors.CorsConfiguration;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Configuration
public class AppConfig {
    @Bean
    public RestTemplate restTemplate() {
        RestTemplate restTemplate = new RestTemplate();

        // Add custom message converters
        MappingJackson2HttpMessageConverter converter = new MappingJackson2HttpMessageConverter();
        converter.setSupportedMediaTypes(Collections.singletonList(MediaType.APPLICATION_JSON));

        // Add support for text/json
        List<MediaType> mediaTypes = new ArrayList<>();
        mediaTypes.add(MediaType.APPLICATION_JSON);
        mediaTypes.add(MediaType.valueOf("text/json"));
        converter.setSupportedMediaTypes(mediaTypes);

        restTemplate.getMessageConverters().add(converter);
        return restTemplate;
    }

    @Bean
    public SecurityFilterChain configuration(HttpSecurity http) throws Exception {


        http.sessionManagement(se -> se.sessionCreationPolicy(SessionCreationPolicy.STATELESS)).
                cors(cors ->{
                    cors.configurationSource(new org.springframework.web.cors.CorsConfigurationSource(){

                        @Override
                        public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
                            CorsConfiguration configuration= new CorsConfiguration();
                            configuration.setAllowedOriginPatterns(Collections.singletonList("*"));
                            configuration.setAllowedMethods(Collections.singletonList("*"));
                            configuration.setAllowCredentials(true);
                            configuration.setAllowedHeaders(Collections.singletonList("*"));
                            configuration.setExposedHeaders(Arrays.asList("Authorization"));
                            return configuration;
                        }
                    });
                }) .authorizeHttpRequests(auth -> auth.requestMatchers(HttpMethod.POST , "/auth/singUp").permitAll()
                        .requestMatchers("/swagger-ui*/**","/v3/api-docs/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/all").permitAll()
                         .requestMatchers(HttpMethod.POST, "/save").permitAll()
                        .requestMatchers(HttpMethod.PUT, "/update/*").permitAll()
                        .requestMatchers(HttpMethod.DELETE, "/delete/*").permitAll()
                        .requestMatchers(HttpMethod.POST, "/sync-customers\"").permitAll()
                        .anyRequest().authenticated())
                .csrf(csrf -> csrf.disable())
                .addFilterAfter(new JwtTokenGeneratorFilter(), BasicAuthenticationFilter.class)
                .addFilterBefore(new JwtTokenValidatorFilter(), BasicAuthenticationFilter.class)
                .formLogin(Customizer.withDefaults())
                .httpBasic(Customizer.withDefaults());

        return http.build();

    }
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    }

package com.example.backend.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityWebConf {
    private final JwtAuthFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(authorize -> {
                            authorize.requestMatchers("/auth/user/edit").hasRole("CLIENT");
                            authorize.requestMatchers("/auth/user").hasRole("CLIENT");
                            authorize.requestMatchers("/auth/**").permitAll();
                            authorize.requestMatchers("/api/cart/**").hasRole("CLIENT");
                            authorize.requestMatchers("/api/comment/**").hasRole("CLIENT");
                            authorize.requestMatchers("/api/orders/**").hasRole("CLIENT");
                            authorize.requestMatchers("/images/upload").hasRole("ADMIN");
                            authorize.requestMatchers(
                                    new AntPathRequestMatcher("/api/products", HttpMethod.POST.toString()),
                                    new AntPathRequestMatcher("/api/products", HttpMethod.PUT.toString()),
                                    new AntPathRequestMatcher("/api/products", HttpMethod.DELETE.toString())
                            ).hasRole("ADMIN");
                            authorize.anyRequest().permitAll();
                        }
                )
                .sessionManagement(sessionManagement -> {
                    sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS);
                })
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .cors();
        return http.build();
    }
}
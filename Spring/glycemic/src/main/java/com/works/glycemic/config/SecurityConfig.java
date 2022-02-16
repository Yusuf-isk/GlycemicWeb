package com.works.glycemic.config;

import com.works.glycemic.services.UserService;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    final UserService service;
    public SecurityConfig(UserService service) {
        this.service = service;
    }

    // sql -> jpa query -> user control
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService((service)).passwordEncoder(service.encoder());
        auth.inMemoryAuthentication()
                .withUser("user")
                .password("user")
                .roles("user")
                .and().withUser("admin")
                .password("{noop}admin")
                .roles("admin");
    }

    // hangi yöntemle giriş yapılarak, rollere göre hangi servis kullanılcak?
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.headers().frameOptions().disable();

        http
                .cors().and()
                .httpBasic()
                .and()
                .authorizeHttpRequests()
                .antMatchers("/foods/save","/foods/foodDelete","/foods/foodUpdate").permitAll()
                .antMatchers( "foods/detail/**","/foods/userFoodList").permitAll()
                .antMatchers("/foods/adminWaitFoodList").permitAll()

                .antMatchers("/foods/list").hasAnyRole("user","admin")
                .antMatchers("/register/userRegister", "/register/adminRegister","/register/login").permitAll()
                .and()
                .csrf().disable()
                .formLogin().disable()
                .logout().logoutUrl("/logout").invalidateHttpSession(true);
    }


}
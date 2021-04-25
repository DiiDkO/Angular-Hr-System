package com.example.test.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter implements WebMvcConfigurer {

    @Autowired
    UserDetailsService userDetailsService;
    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .antMatchers("/login").permitAll()
                .antMatchers("/leave_types/**").hasAnyRole("admin","user")
                .antMatchers("/users/**").hasAnyRole("admin","user")
                .antMatchers("/groups/**").hasRole("admin")
                .antMatchers("/roles/**").hasRole("admin")
                .antMatchers(HttpMethod.GET,"/leave_requests").hasAnyRole("admin")
                .antMatchers(HttpMethod.POST,"/leave_requests").hasAnyRole("admin","user")
                .antMatchers(HttpMethod.PUT,"/leave_requests").hasAnyRole("admin","user")
                .antMatchers("/projects/**").hasRole("admin")
                .antMatchers("/companies/**").hasRole("admin")
                .anyRequest().authenticated()
                .and().httpBasic();
        http.csrf().disable();
        http.cors();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        return new MyUserDetailsService();
    }

    @Bean
    public PasswordEncoder getPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
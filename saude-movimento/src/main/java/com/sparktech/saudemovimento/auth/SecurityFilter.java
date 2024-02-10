package com.sparktech.saudemovimento.auth;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.sparktech.saudemovimento.repositories.UserRepository;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class SecurityFilter extends OncePerRequestFilter {
    @Autowired
    TokenService tokenService;
    @Autowired
    UserRepository userRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String userToken = getUserToken(request);
        if (userToken != null) {
            String userSubject = tokenService.validateUserToken(userToken);
            UserDetails user = userRepository.findByUserNameAuth(userSubject);
            var authentication = new UsernamePasswordAuthenticationToken(user.getUsername(), null,
                    user.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        filterChain.doFilter(request, response);
    }

    private String getUserToken(HttpServletRequest request) {
        String authToken = request.getHeader("Authorization");
        if (authToken == null)
            return null;
        return authToken.replace("Bearer ", "");

    }
}

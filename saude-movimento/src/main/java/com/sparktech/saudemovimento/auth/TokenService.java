package com.sparktech.saudemovimento.auth;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.sparktech.saudemovimento.models.UserModel;

/**
 * This class generates and validates JWT tokens
 */
@Service
public class TokenService {
    /**
     * token Secret is injected by app.prop
     */
    @Value("{api.security.token.secret}")
    private String jwtTokenSecret;

    /**
     * Generates and return a JWT token
     * 
     * @param user User Entity
     * @return JWT token in String type
     */
    public String generateToken(String userName) {
        String userJwtToken = "";
        try {
            userJwtToken = getJWTToken(userName);
        } catch (JWTCreationException e) {
            throw new RuntimeException("Errow While Generating token\nError:" + e);
        }
        return userJwtToken;
    }

    /**
     * Generated and returns the JWT token
     * 
     * @param userName user name given in the basic Auth
     * @return JWT token in String type
     * @throws JWTCreationException when any credentials is missing or is wrong
     */
    private String getJWTToken(String userName) throws JWTCreationException {
        Algorithm algorithm = Algorithm.HMAC256(jwtTokenSecret);
        final String userJwtToken = JWT.create()
                .withIssuer("SparkTech")
                .withSubject(userName)
                .withExpiresAt(getExpirationDate())
                .sign(algorithm);
        return userJwtToken;
    }

    /**
     * validates the token and return the userName
     * 
     * @param token user token
     * @return userName
     */
    public String validateUserToken(String token) {
        String userName = "";
        try {
            userName = getSubjectInTheToken(token);
            return userName;
        } catch (JWTVerificationException e) {
            return "";
            // throw new RuntimeException("Errow While Validating the token\nError:" + e);
        }
    }

    /**
     * Verifies the user token and return his userName
     * 
     * @param token JWT token
     * @return user name
     * @throws JWTVerificationException
     */
    private String getSubjectInTheToken(String token) throws JWTVerificationException {
        Algorithm algorithm = Algorithm.HMAC256(jwtTokenSecret);
        return JWT.require(algorithm)
                .withIssuer("SparkTech")
                .build()
                .verify(token)
                .getSubject();
    }

    /**
     * Returns a expiration date for a token
     * 
     * @return
     */
    private Instant getExpirationDate() {
        return LocalDateTime.now().plusDays(5).toInstant(ZoneOffset.ofHoursMinutes(02, 00));
    }
}

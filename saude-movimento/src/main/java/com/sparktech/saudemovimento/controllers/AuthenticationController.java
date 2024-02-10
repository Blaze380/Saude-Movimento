package com.sparktech.saudemovimento.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sparktech.saudemovimento.models.UserModel;
import com.sparktech.saudemovimento.models.records.UserRecord;
import com.sparktech.saudemovimento.repositories.UserRepository;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/auth")
@AllArgsConstructor
public class AuthenticationController {
    private AuthenticationManager authManager;
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody UserRecord userRecord) {
        var userNamePassword = new UsernamePasswordAuthenticationToken(userRecord.userName(),
                userRecord.userPassword());
        var auth = this.authManager.authenticate(userNamePassword);
        return ResponseEntity.ok("bbbb");
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signUpUser(@RequestBody UserRecord userRecord) {
        final String userEncryptedPassword = new BCryptPasswordEncoder().encode(userRecord.userPassword());
        final UserModel user = new UserModel("", userRecord.userName(), userEncryptedPassword);
        userRepository.save(user);
        return ResponseEntity.ok("aaa");
    }
}

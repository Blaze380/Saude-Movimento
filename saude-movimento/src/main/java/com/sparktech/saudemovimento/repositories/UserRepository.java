package com.sparktech.saudemovimento.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import com.sparktech.saudemovimento.models.UserModel;
import java.util.List;

public interface UserRepository extends JpaRepository<UserModel, String> {
    UserDetails findByUserNameAuth(String userNameAuth);

}

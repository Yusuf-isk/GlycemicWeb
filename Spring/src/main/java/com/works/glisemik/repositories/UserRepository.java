package com.works.glisemik.repositories;

import com.works.glisemik.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmailEqualsIgnoreCase(String email);

}

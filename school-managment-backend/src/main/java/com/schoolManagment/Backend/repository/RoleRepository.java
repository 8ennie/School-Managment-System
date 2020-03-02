package com.schoolManagment.Backend.repository;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.schoolManagment.Backend.model.adminestration.ERole;
import com.schoolManagment.Backend.model.adminestration.Role;



@Repository
@CrossOrigin(origins = "*", maxAge = 3600)
public interface RoleRepository extends JpaRepository<Role, Long> {
	Optional<Role> findByName(ERole name);
}
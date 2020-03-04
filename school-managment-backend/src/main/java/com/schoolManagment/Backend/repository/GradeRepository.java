package com.schoolManagment.Backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.schoolManagment.Backend.model.school.Grade;
import com.schoolManagment.Backend.projection.GradeProjection;

@CrossOrigin(origins = "*", maxAge = 3600)
@RepositoryRestResource(excerptProjection = GradeProjection.class)
public interface GradeRepository extends JpaRepository<Grade, Long>{
	Optional<List<Grade>> findByName(String name);
}

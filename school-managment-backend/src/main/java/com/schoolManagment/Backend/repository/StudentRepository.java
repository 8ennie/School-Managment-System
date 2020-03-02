package com.schoolManagment.Backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.schoolManagment.Backend.model.school.Student;
import com.schoolManagment.Backend.projection.StudentProjection;

@CrossOrigin(origins = "*", maxAge = 3600)
@RepositoryRestResource(excerptProjection = StudentProjection.class)
public interface StudentRepository extends JpaRepository<Student, Long>{

	
}

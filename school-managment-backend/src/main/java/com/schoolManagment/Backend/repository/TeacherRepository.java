package com.schoolManagment.Backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.schoolManagment.Backend.model.school.Teacher;
import com.schoolManagment.Backend.projection.TeacherProjection;


@CrossOrigin(origins = "*", maxAge = 3600)
@RepositoryRestResource(excerptProjection = TeacherProjection.class)
public interface TeacherRepository extends JpaRepository<Teacher, Long>{

}

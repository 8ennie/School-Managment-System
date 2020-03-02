package com.schoolManagment.Backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.schoolManagment.Backend.model.school.Lesson;
import com.schoolManagment.Backend.projection.LessonProjection;

@CrossOrigin(origins = "*", maxAge = 3600)
@RepositoryRestResource(excerptProjection = LessonProjection.class)
public interface LessonRepository extends JpaRepository<Lesson,Long>{

}

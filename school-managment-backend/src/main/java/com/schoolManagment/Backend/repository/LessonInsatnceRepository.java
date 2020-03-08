package com.schoolManagment.Backend.repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.schoolManagment.Backend.model.school.Grade;
import com.schoolManagment.Backend.model.school.LessonInstance;
import com.schoolManagment.Backend.model.school.Teacher;

@CrossOrigin(origins = "*", maxAge = 3600)
@RepositoryRestResource()
public interface LessonInsatnceRepository extends JpaRepository<LessonInstance, Long> {

	Optional<List<LessonInstance>> findByDate(Date date);

	Optional<List<LessonInstance>> findByDateAndTeacher(Date date, Teacher teacher);

	Optional<List<LessonInstance>> findByDateAndGrade(Date date, Grade grade);

}

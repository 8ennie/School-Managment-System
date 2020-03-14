package com.schoolManagment.Backend.repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.schoolManagment.Backend.model.school.LessonInstance;
import com.schoolManagment.Backend.model.school.SubstituteLesson;
import com.schoolManagment.Backend.model.school.Teacher;
import com.schoolManagment.Backend.model.school.help.Grade;
import com.schoolManagment.Backend.projection.SubstituteLessonProjection;


@CrossOrigin(origins = "*", maxAge = 3600)
@RepositoryRestResource(excerptProjection = SubstituteLessonProjection.class)
public interface SubstituteLessonRepository extends JpaRepository<SubstituteLesson, Long> {

	Optional<List<SubstituteLesson>> findByDate(@DateTimeFormat(pattern="yyyy-MM-dd") Date date);

	Optional<List<SubstituteLesson>> findByDateAndTeacher(@DateTimeFormat(pattern="yyyy-MM-dd") Date date, Teacher teacher);

	Optional<List<SubstituteLesson>> findByDateAndGrade(@DateTimeFormat(pattern="yyyy-MM-dd") Date date, Grade grade);
	
}

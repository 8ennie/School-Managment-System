package com.schoolManagment.Backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;

import com.schoolManagment.Backend.model.school.Grade;
import com.schoolManagment.Backend.model.school.Lesson;
import com.schoolManagment.Backend.model.school.LessonTime;
import com.schoolManagment.Backend.model.school.Teacher;
import com.schoolManagment.Backend.projection.LessonProjection;

@CrossOrigin(origins = "*", maxAge = 3600)
@RepositoryRestResource(excerptProjection = LessonProjection.class)
public interface LessonRepository extends JpaRepository<Lesson,Long>{
	Optional<List<Lesson>> findByGrade(@PathVariable("grade")Grade grade);
	
	Optional<List<Lesson>> findByTeacher(@PathVariable("teacher")Teacher teacher);
	
	Optional<List<Lesson>> findByLessonTime(@PathVariable("lessonTime")LessonTime lessonTime);
	
	Optional<List<Lesson>> findByLessonTimeAndTeacher(LessonTime lessonTime, Teacher teacher);
	
	Optional<List<Lesson>> findByLessonTimeAndGrade(LessonTime lessonTime, Grade grade);
}

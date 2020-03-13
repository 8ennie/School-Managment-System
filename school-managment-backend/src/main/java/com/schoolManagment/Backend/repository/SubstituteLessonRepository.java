package com.schoolManagment.Backend.repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.schoolManagment.Backend.model.school.LessonInstance;
import com.schoolManagment.Backend.model.school.Teacher;
import com.schoolManagment.Backend.model.school.help.Grade;


@CrossOrigin(origins = "*", maxAge = 3600)
@RepositoryRestResource()
public interface SubstituteLessonRepository {

	Optional<List<LessonInstance>> findByDate(@DateTimeFormat(pattern="yyyy-MM-dd") Date date);

	Optional<List<LessonInstance>> findByDateAndTeacher(@DateTimeFormat(pattern="yyyy-MM-dd") Date date, Teacher teacher);

	Optional<List<LessonInstance>> findByDateAndGrade(@DateTimeFormat(pattern="yyyy-MM-dd") Date date, Grade grade);
	
}

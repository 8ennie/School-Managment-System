package com.schoolManagment.Backend.repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.schoolManagment.Backend.model.school.LessonInstance;
import com.schoolManagment.Backend.model.school.Teacher;
import com.schoolManagment.Backend.model.school.help.Grade;
import com.schoolManagment.Backend.projection.LessonInstanceProjection;

@CrossOrigin(origins = "*", maxAge = 3600)
@RepositoryRestResource(excerptProjection = LessonInstanceProjection.class)
public interface LessonInstanceRepository extends JpaRepository<LessonInstance, Long> {

	Optional<List<LessonInstance>> findByDate(@DateTimeFormat(pattern="dd-MM-yyyy") Date date);

	Optional<List<LessonInstance>> findByDateAndTeacher(@DateTimeFormat(pattern="dd-MM-yyyy") Date date, Teacher teacher);

	Optional<List<LessonInstance>> findByDateAndGrade(@DateTimeFormat(pattern="dd-MM-yyyy") Date date, Grade grade);

}

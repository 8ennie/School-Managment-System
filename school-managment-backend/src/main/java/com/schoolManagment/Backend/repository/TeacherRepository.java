package com.schoolManagment.Backend.repository;

import java.time.DayOfWeek;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.schoolManagment.Backend.model.school.Teacher;
import com.schoolManagment.Backend.projection.TeacherProjection;


@CrossOrigin(origins = "*", maxAge = 3600)
@RepositoryRestResource(excerptProjection = TeacherProjection.class)
public interface TeacherRepository extends JpaRepository<Teacher, Long>{

	Optional<List<Teacher>> findByLeaveDaysDate(@DateTimeFormat(pattern="yyyy-MM-dd") Date date);
	
}

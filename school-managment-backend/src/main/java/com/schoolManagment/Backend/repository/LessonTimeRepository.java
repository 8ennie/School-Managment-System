package com.schoolManagment.Backend.repository;

import java.time.DayOfWeek;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.schoolManagment.Backend.model.school.LessonTime;
import com.schoolManagment.Backend.projection.LessonTimeProjection;

@CrossOrigin(origins = "*", maxAge = 3600)
@RepositoryRestResource(excerptProjection = LessonTimeProjection.class)
public interface LessonTimeRepository extends JpaRepository<LessonTime, Long>{
	Optional<List<LessonTime>>findByHour(int hour);
	
	Optional<List<LessonTime>>findByDayOfWeek(DayOfWeek dayOfWeek);
	
	Optional<LessonTime>findByDayOfWeekAndHour(DayOfWeek dayOfWeek, int hour);
}

package com.schoolManagment.Backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.schoolManagment.Backend.model.school.LessonTime;

@CrossOrigin(origins = "*", maxAge = 3600)
@RepositoryRestResource()
public interface LessonTimeRepository extends JpaRepository<LessonTime, Long>{
	Optional<LessonTime>findByHour(int hour);
}

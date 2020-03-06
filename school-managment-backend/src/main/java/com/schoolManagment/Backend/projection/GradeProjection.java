package com.schoolManagment.Backend.projection;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import com.schoolManagment.Backend.model.school.EducationalStage;
import com.schoolManagment.Backend.model.school.Grade;

@Projection(name = "gradeProjection", types = {Grade.class})
public interface GradeProjection {

	String getName();
	
	EducationalStage getEducationalStage();
	
	@Value("#{target.id}")
	Long getId();
}

package com.schoolManagment.Backend.projection;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import com.schoolManagment.Backend.model.school.Subject;

@Projection(name = "studentProjection", types = {Subject.class})
public interface SubjectProjection {

	String getName();
	
	@Value("#{target.id}")
	Long getId();
}

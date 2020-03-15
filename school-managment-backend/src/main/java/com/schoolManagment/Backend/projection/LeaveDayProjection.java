package com.schoolManagment.Backend.projection;

import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import com.schoolManagment.Backend.model.school.LeaveDay;

import com.schoolManagment.Backend.model.school.help.LeaveType;

@Projection(name = "leaveDayProjection", types = {LeaveDay.class})
public interface LeaveDayProjection {

	@Value("#{target.id}")
	Long getId();

	PersonProjection getPerson();
	
	Date getDate();
	
	LeaveType getType();
	
	String getDescription();

}

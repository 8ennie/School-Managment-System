package com.schoolManagment.Backend.model.school;

import java.time.DayOfWeek;
import java.time.LocalTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LessonTime {

	@Id
	@GeneratedValue
	private Long id;
	
	private int hour;
	
	@Column(columnDefinition = "TIME")
	private LocalTime startTime; 
	
	@Column(columnDefinition = "TIME")
	private LocalTime endTime; 
	
	@Enumerated(EnumType.STRING)
	private DayOfWeek dayOfWeek;
	
	
}

package com.schoolManagment.Backend.model.school;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class LessonInstance extends Lesson{

	@Temporal(TemporalType.DATE)
	private Date date;
	
	private String info;
	
	private String classBookEntry;
	
}

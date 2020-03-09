package com.schoolManagment.Backend.model.school;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LessonInstance extends Lesson{

	@Temporal(TemporalType.DATE)
	@JsonFormat(pattern="dd-MM-yyyy")
	private Date date;
	
	private String info;
	
	private String classBookEntry;
	
}
